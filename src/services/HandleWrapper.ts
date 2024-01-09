import { HandleHolder, fakeHandleType } from "@war3js/unsafe";
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
    #ignoreTypes: Array<string>;

    constructor() {
        this.#ignoreTypes = [];
        nativeEvents.addListener("newHandle", this.onNewHandle);
    }

    /* eslint-disable @typescript-eslint/no-unused-vars */

    public onNewHandle = (handle: HandleHolder<string>, constructorNative: string) => {
        if (handle.type === fakeHandleType) {
            handle.payload = handle;
        } else if (handle.type in typeToConstructor) {
            const handleConstructor = typeToConstructor[handle.type] as HandleConstructor;
            handle.payload = new handleConstructor(handle);

            // Todo call user class constructor
        } else {
            if (this.#ignoreTypes.indexOf(handle.type) === -1) {
                console.warn(`Attempting to create a class from an unknown handle type ${handle.type}`);
                this.#ignoreTypes.push(handle.type);
            }

            handle.payload = handle;
        }
    };
}
