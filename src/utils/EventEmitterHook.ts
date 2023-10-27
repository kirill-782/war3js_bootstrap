import { EventEmitter } from "@war3js/events";

export interface OnEmitterAddListener {
    onEmitterAddListener: (event: string | symbol | number, listener: (...args: any[]) => void) => void;
}

type EventEmitterConstructor = new (...args: any) => EventEmitter & OnEmitterAddListener;

export interface EventEmitterHook extends OnEmitterAddListener {}
export class EventEmitterHook extends EventEmitter {
    private constructor() {
        super();
    }

    public static hookAddListener(eventEmitter: EventEmitterConstructor): void {
        eventEmitter.prototype["addListener"] = EventEmitterHook.prototype.addListener;
        eventEmitter.prototype["on"] = EventEmitterHook.prototype.on;
        eventEmitter.prototype["once"] = EventEmitterHook.prototype.once;
        eventEmitter.prototype["prependListener"] = EventEmitterHook.prototype.prependListener;
        eventEmitter.prototype["prependOnceListener"] = EventEmitterHook.prototype.prependOnceListener;
    }

    addListener(event: any, listener: any): this {
        try {
            this.onEmitterAddListener(event, listener);
        } catch (e) {}

        super.addListener(event, listener);
        return this;
    }

    on(event: any, listener: any): this {
        try {
            this.onEmitterAddListener(event, listener);
        } catch (e) {}

        super.on(event, listener);
        return this;
    }

    once(event: any, listener: any): this {
        try {
            this.onEmitterAddListener(event, listener);
        } catch (e) {}

        super.once(event, listener);
        return this;
    }

    prependListener(event: any, listener: any): this {
        try {
            this.onEmitterAddListener(event, listener);
        } catch (e) {}

        super.prependListener(event, listener);
        return this;
    }

    prependOnceListener(event: any, listener: any): this {
        try {
            this.onEmitterAddListener(event, listener);
        } catch (e) {}

        super.prependOnceListener(event, listener);
        return this;
    }
}
