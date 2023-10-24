import { EventEmitter } from "events";
import TypedEmitter, { EventMap } from "typed-emitter";

export interface HandleEventMap extends EventMap {
  error: (error: Error) => void;
  remove: () => void;
}

export class Handle<T extends HandleEventMap = HandleEventMap> extends (EventEmitter as {
  new <T extends EventMap>(): TypedEmitter<T>;
})<T> {
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
