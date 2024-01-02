import { EventEmitter, EventMap } from "@war3js/events";
import { consoleLog } from "@war3js/unsafe";
import {
    CurlHandle,
    PreformCallback,
    curl_easy_init,
    curl_easy_setopt,
    constants,
    curl_easy_perform,
    curl_ws_recv,
    curl_ws_send,
    curl_easy_cleanup,
} from "@war3js/curl";
import { CreateTimerNe, TimerStart } from "../../utils/common.js";
import { TextDecoder, TextEncoder } from "text-decoding";

import { Headers, getRawHeaders } from "@war3js/headers-polyfill";

interface WebsocketEvents extends EventMap {
    open: () => void;
    message: (message: string | ArrayBuffer) => void;
}

const maxReceivedMessageSize = 15 * 1024 * 1024;
const maxReceivedFrameSize = 512 * 1024;

const maxSendedMessageSize = 15 * 1024 * 1024;
const maxSendedFrameSize = 512 * 1024;

const CLOSE_DESCRIPTIONS = {
    1000: "Normal connection closure",
    1001: "Remote peer is going away",
    1002: "Protocol error",
    1003: "Unprocessable input",
    1004: "Reserved",
    1005: "Reason not provided",
    1006: "Abnormal closure, no further detail available",
    1007: "Invalid data received",
    1008: "Policy violation",
    1009: "Message too big",
    1010: "Extension requested by client is required",
    1011: "Internal Server Error",
    1015: "TLS Handshake Failed",
};

interface IncomingMessage {
    frames: Array<ArrayBuffer>;
    type: number;
}

interface OutgointFrame {
    frame: ArrayBuffer;
    flags: number;
}

export class Websocket extends EventEmitter<WebsocketEvents> {
    static CONNECTING = 0;
    static OPEN = 1;
    static CLOSING = 2;
    static CLOSED = 3;

    #curlHandle: CurlHandle;

    #connectionSate: number;

    get readyState() {
        if (
            this.#connectionSate === Websocket.CLOSED &&
            (this.#currentOurgoingFrame || this.#outgoingFrameQueue.length > 0)
        )
            return Websocket.CLOSING;

        return this.#connectionSate;
    }

    get bufferedAmount() {
        return this.#outgoingFrameQueue.reduce(
            (prev, i) => {
                return prev + i.frame.byteLength;
            },
            this.#currentOurgoingFrame?.byteLength || 0,
        );
    }

    #incomingMessage?: IncomingMessage;
    #incomingFrame?: Uint8Array;

    #currentOurgoingFrame?: Uint8Array;
    #outgoingFrameQueue: Array<OutgointFrame> = [];

    #errorThrown = false;

    constructor(url: string, headers?: Headers) {
        super();

        this.#curlHandle = curl_easy_init();

        curl_easy_setopt(this.#curlHandle, constants.CURLOPT_URL, url);
        if (headers instanceof Headers)
            curl_easy_setopt(this.#curlHandle, constants.CURLOPT_HTTPHEADER, getRawHeaders(headers));
        curl_easy_setopt(this.#curlHandle, constants.CURLOPT_CONNECT_ONLY, 2);
        curl_easy_setopt(this.#curlHandle, constants.CURLOPT_SSL_VERIFYPEER, 0);

        curl_easy_perform(this.#curlHandle, this.#onCurlPerformEnd);

        this.#connectionSate = Websocket.CONNECTING;
        this.#incomingFrame = new Uint8Array(new ArrayBuffer(maxReceivedFrameSize));
    }

    public send(message: string | ArrayBuffer | Uint8Array): void {
        if (this.#connectionSate === Websocket.CONNECTING) throw new TypeError("WebSocket still in CONNECTING state.");

        if (this.#connectionSate !== Websocket.OPEN)
            throw new TypeError("WebSocket is already in CLOSING or CLOSED state.");

        let messageBuffer: ArrayBuffer;
        let messageFlags: number;

        if (message instanceof ArrayBuffer) {
            messageBuffer = message;
            messageFlags = constants.CURLWS_BINARY;
        } else if (message instanceof Uint8Array) {
            messageBuffer = message.buffer.slice(message.byteOffset, message.byteLength + message.byteOffset);
            messageFlags = constants.CURLWS_BINARY;
        } else {
            const textEncoder = new TextEncoder();

            messageBuffer = textEncoder.encode(String(message));
            messageFlags = constants.CURLWS_TEXT;
        }

        this.#queueFrame(messageBuffer, messageFlags);
    }

    public close(code?: number, reason?: string) {
        // code validation

        if (typeof code !== "number") code = 1000;

        if (typeof reason !== "string") {
            reason = (CLOSE_DESCRIPTIONS as any)[code];
        }

        if (!this.#validateCloseReason(code)) {
            throw new Error("Close code " + code + " is not valid.");
        }

        if (reason) {
            const textEncoder = new TextEncoder();
            const reasonBytes = textEncoder.encode(reason);

            if (reasonBytes.byteLength > 123) {
                throw new Error("The message must not be greater than 123 bytes.");
            }

            this.#sendClose(code, reasonBytes);
        } else {
            this.#sendClose(code);
        }

        this.#connectionSate = Websocket.CLOSING;
    }

    #sendClose(code: number, reasonBytes?: Uint8Array) {
        const body = new ArrayBuffer(2 + (reasonBytes?.byteLength || 0));
        const bodyWriter = new DataView(body);
        const bodyBuffer = new Uint8Array(body);

        bodyWriter.setUint16(0, code);

        if (reasonBytes) bodyBuffer.set(reasonBytes, 2);

        this.#queueFrame(body, constants.CURLWS_CLOSE);
    }

    #queueFrame(payload: ArrayBuffer, flags: number, front?: boolean) {
        if (payload.byteLength > maxSendedMessageSize) {
            throw new Error("Send message too big");
        }

        const outgoingFrames = new Array<OutgointFrame>();

        if (payload.byteLength <= maxSendedFrameSize) {
            outgoingFrames.push({
                frame: payload,
                flags: flags & ~(constants.CURLWS_OFFSET | constants.CURLWS_CONT),
            });
        } else {
            const totalLength = payload.byteLength;

            for (let offset = 0; offset < totalLength; offset += maxSendedFrameSize) {
                const chunk = payload.slice(offset, offset + maxSendedFrameSize);

                outgoingFrames.push({
                    frame: chunk,
                    flags: flags & ~(constants.CURLWS_OFFSET | constants.CURLWS_CONT),
                });
            }

            outgoingFrames[outgoingFrames.length - 1].flags &= ~constants.CURLWS_CONT;
        }

        if (front) this.#outgoingFrameQueue.unshift(...outgoingFrames);
        else this.#outgoingFrameQueue.push(...outgoingFrames);

        try {
            this.#sendSocket();
        } catch (e) {}
    }

    #processSocket = () => {
        if (this.#connectionSate === Websocket.OPEN) {
            this.#readSocket();
        } else if (this.#connectionSate !== Websocket.CONNECTING || this.#connectionSate !== Websocket.CLOSED) {
            this.#sendSocket();
        }
    };

    #processIncomingFrame(payload: ArrayBuffer, flags: number) {
        if (flags & constants.CURLWS_TEXT || flags & constants.CURLWS_BINARY) {
            if (!this.#incomingMessage)
                this.#incomingMessage = {
                    frames: [],
                    type: flags & (constants.CURLWS_TEXT | constants.CURLWS_BINARY),
                };

            this.#incomingMessage.frames.push(payload);

            if (!(flags & constants.CURLWS_CONT)) {
                if (this.#incomingMessage.type & constants.CURLWS_TEXT) {
                    const textDecoder = new TextDecoder("utf8");

                    consoleLog(0, this.#incomingMessage.frames.length);

                    const textMessage = this.#incomingMessage.frames.reduce((prev, currentValue) => {
                        consoleLog(0, "prev " + prev);
                        consoleLog(0, "currentValue " + currentValue.byteLength);
                        return prev + textDecoder.decode(new Uint8Array(currentValue), { stream: true });
                    }, "");

                    this.emit("message", textMessage);
                } else {
                    const messageSize = this.#incomingMessage.frames.reduce((prev, currentValue) => {
                        return prev + currentValue.byteLength;
                    }, 0);

                    const binaryMessage = new Uint8Array(new ArrayBuffer(messageSize));

                    this.#incomingMessage.frames.reduce((prev, currentValue) => {
                        binaryMessage.set(new Uint8Array(currentValue), prev);
                        return prev + currentValue.byteLength;
                    }, 0);

                    this.emit("message", binaryMessage.buffer);
                }

                this.#incomingMessage = null;
            } else {
                const incomingMessageSize = this.#incomingMessage.frames.reduce((prev, currentValue) => {
                    return prev + currentValue.byteLength;
                }, 0);

                if (incomingMessageSize > maxReceivedMessageSize) {
                    this.#dropConnection(new Error("Maximum message size exceeded."));
                }
            }
        } else if (flags & constants.CURLWS_CLOSE) {
            consoleLog(0, "#CURLWS_CLOSE");
            if (this.#connectionSate === Websocket.CLOSING) {
                this.#connectionSate = Websocket.CLOSED;
                this.#free();
            } else {
                if (payload.byteLength >= 2) {
                    this.#connectionSate = Websocket.CLOSING;
                    this.#outgoingFrameQueue = [];
                    this.#sendClose(new DataView(payload).getUint16(0));
                }
            }
        }
    }

    #free() {
        consoleLog(0, "#free");
        curl_easy_cleanup(this.#curlHandle);

        this.#currentOurgoingFrame = null;
        this.#outgoingFrameQueue = [];

        this.#incomingMessage = null;
        this.#incomingFrame = null;
    }

    #readSocket() {
        while (true) {
            const readResult = curl_ws_recv(this.#curlHandle, this.#incomingFrame);

            consoleLog(0, "curl_ws_recv", JSON.stringify(readResult));

            if (readResult.result === constants.CURLE_OK) {
                if (readResult.recv + readResult.bytesLeft > maxReceivedFrameSize) {
                    this.#dropConnection(new Error("Maximum frame size exceeded."));
                }

                // move offset

                this.#incomingFrame = new Uint8Array(
                    this.#incomingFrame.buffer,
                    this.#incomingFrame.byteOffset + readResult.recv,
                );

                if (readResult.bytesLeft === 0) {
                    this.#processIncomingFrame(
                        this.#incomingFrame.buffer.slice(0, this.#incomingFrame.byteOffset),
                        readResult.flags,
                    );

                    this.#incomingFrame = new Uint8Array(this.#incomingFrame.buffer);
                }

                if (readResult.recv === 0) {
                    break;
                }
            } else if (readResult.result === constants.CURLE_AGAIN) break;
        }
    }

    #sendSocket() {
        if (this.#currentOurgoingFrame) {
            const sendResult = curl_ws_send(this.#curlHandle, this.#currentOurgoingFrame, 0, constants.CURLWS_OFFSET);

            consoleLog(0, "curl_ws_send", JSON.stringify(sendResult));

            if (sendResult.result === constants.CURLE_OK) {
                if (sendResult.sent === this.#currentOurgoingFrame.byteLength) {
                    // Frame fully sended

                    this.#currentOurgoingFrame = null;
                } else {
                    // Move offset
                    this.#currentOurgoingFrame = new Uint8Array(
                        this.#currentOurgoingFrame.buffer,
                        this.#currentOurgoingFrame.byteOffset + sendResult.sent,
                    );

                    return;
                }
            }
        }

        // Try send next frame

        while (true) {
            if (this.#outgoingFrameQueue.length === 0) return;

            const nextFrame = this.#outgoingFrameQueue[0];

            const sendResult = curl_ws_send(
                this.#curlHandle,
                nextFrame.frame,
                nextFrame.frame.byteLength,
                constants.CURLWS_OFFSET | nextFrame.flags,
            );

            if (sendResult.result === constants.CURLE_OK) {
                this.#outgoingFrameQueue.shift();

                if (nextFrame.frame.byteLength !== sendResult.sent) {
                    this.#currentOurgoingFrame = new Uint8Array(nextFrame.frame, sendResult.sent);

                    // We cant send more info
                    break;
                }
            } else if (sendResult.result === constants.CURLE_AGAIN) {
                break;
            } else if (sendResult.result === constants.CURLE_SEND_ERROR) {
                // Socket closed

                break;
            }
        }
    }

    #emitError(error: Error) {
        if (!this.#errorThrown) {
            try {
                this.#errorThrown = true;
                this.emit("error", error);
            } catch (e) {}
        }
    }

    #dropConnection(e?: Error) {
        if (e) this.#emitError(e);
        this.#free();
        this.#connectionSate = Websocket.CLOSED;
    }

    #validateCloseReason(code: number) {
        if (code < 1000) {
            // Status codes in the range 0-999 are not used
            return false;
        }
        if (code >= 1000 && code <= 2999) {
            // Codes from 1000 - 2999 are reserved for use by the protocol.  Only
            // a few codes are defined, all others are currently illegal.
            return [1000, 1001, 1002, 1003, 1007, 1008, 1009, 1010, 1011, 1012, 1013, 1014, 1015].indexOf(code) !== -1;
        }
        if (code >= 3000 && code <= 3999) {
            // Reserved for use by libraries, frameworks, and applications.
            // Should be registered with IANA.  Interpretation of these codes is
            // undefined by the WebSocket protocol.
            return true;
        }
        if (code >= 4000 && code <= 4999) {
            // Reserved for private use.  Interpretation of these codes is
            // undefined by the WebSocket protocol.
            return true;
        }
        if (code >= 5000) {
            return false;
        }
    }

    #onCurlPerformEnd: PreformCallback = (code, string) => {
        if (this.#connectionSate === Websocket.CLOSED) {
            curl_easy_cleanup(this.#curlHandle);
            return;
        }

        this.#connectionSate = code === 0 ? Websocket.OPEN : Websocket.CLOSED;

        if (this.#connectionSate === Websocket.CLOSED) {
            this.#emitError(new Error(string));

            curl_easy_cleanup(this.#curlHandle);
            this.#curlHandle = null;
        } else if (this.#connectionSate === Websocket.OPEN) {
            this.emit("open");
            TimerStart(CreateTimerNe(), 1, true, this.#processSocket);
        }
    };
}
