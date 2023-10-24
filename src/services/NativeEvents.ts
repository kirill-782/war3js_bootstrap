import { EventEmitter } from "events";
import TypedEmitter, { EventMap } from "typed-emitter";

import { setOnNewHandle, setOnHandleDestroy } from "../unsafe.js";

export interface NativeEventsEventMap extends EventMap {
  newHandle: (handle: HandleHolder<string>, constructorNative: string) => void;
  handleDestroy: (handle: HandleHolder<string>) => void;
}

class NativeEvents extends EventEmitter {}

export const nativeEvents = new NativeEvents() as TypedEmitter<NativeEventsEventMap>;

setOnNewHandle((handle, constructorNative) => {
  nativeEvents.emit("newHandle", handle, constructorNative);
});

setOnHandleDestroy((handle) => {
  nativeEvents.emit("handleDestroy", handle);
});
