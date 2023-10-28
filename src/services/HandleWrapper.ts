import { fakeHandleType } from "@war3js/unsafe";
import { Handle, HandleConstructor } from "../handles/Handle.js";
import { Player } from "../handles/Player.js";
import { Unit } from "../handles/Unit.js";
import { Widget } from "../handles/Widget.js";
import { nativeEvents } from "./NativeEvents.js";

const typeToConstructor: Record<string, new (...any: any[]) => Handle> = {
    unit: Unit,
    player: Player,
    widget: Widget,
};

export class HandleWrapper {
    constructor() {
        nativeEvents.addListener("newHandle", this.onNewHandle);
    }

    public onNewHandle = (handle: HandleHolder<string>, constructorNative: string) => {
        if (handle.type === fakeHandleType) {
            handle.payload = handle;
        } else if (handle.type in typeToConstructor) {
            const handleConstructor = typeToConstructor[handle.type] as HandleConstructor;
            handle.payload = new handleConstructor(handle);

            // Todo call user class constructor
        } else {
            console.warn(`Attempting to create a class from an unknown handle type ${handle.type}`);
            handle.payload = handle;
        }
    };
}
