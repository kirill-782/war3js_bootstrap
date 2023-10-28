import { EventMap, EventEmitter } from "@war3js/events";
import { getNativeByName } from "@war3js/unsafe";

export type HandleConstructor<T extends string = string, H extends Handle = Handle> = new (
    handle: HandleHolder<T>
) => H;

export interface HandleEventMap extends EventMap {
    error: (error: Error) => void;
    remove: () => void;
}

export class Handle<T extends HandleEventMap = HandleEventMap> extends EventEmitter<T> {
    #handle: HandleHolder<string>;

    constructor(handleHolder: Handle | HandleHolder<string>) {
        super();

        let targetHandleHolder;

        if (handleHolder instanceof HandleHolder) targetHandleHolder = handleHolder;
        if (handleHolder instanceof Handle) targetHandleHolder = handleHolder.#handle;

        targetHandleHolder.payload = this; // Can throw exception is handle locked
        this.#handle = targetHandleHolder;
    }

    get handle() {
        return this.#handle;
    }

    public equals(anotherHandle: Handle): boolean {
        return this.#handle.equals(anotherHandle ? anotherHandle.#handle : null);
    }
}
