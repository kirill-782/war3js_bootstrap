import { EventEmitter, EventMap } from "@war3js/events";

import { setOnNewHandle, setOnHandleDestroy } from "@war3js/unsafe";

export interface NativeEventsEventMap extends EventMap {
    newHandle: (handle: HandleHolder<string>, constructorNative: string) => void;
    handleDestroy: (handle: HandleHolder<string>) => void;
}

class NativeEvents extends EventEmitter<NativeEventsEventMap> {}

export const nativeEvents = new NativeEvents();

setOnNewHandle((handle, constructorNative) => {
    nativeEvents.emit("newHandle", handle, constructorNative);
});

setOnHandleDestroy((handle) => {
    nativeEvents.emit("handleDestroy", handle);
});
