import { setToHandleHolder, getNativeByName } from "@war3js/unsafe";

import { Console } from "./console/Console.js";
import { toHandleHolderSoft } from "./utils/ToHandleHolder.js";
import { HandleBuilder } from "./services/HandleBuilder.js";
import { Widget } from "./handles/Widget.js";
import { Unit } from "./handles/Unit.js";
import { Player } from "./handles/Player.js";
import { HandleWrapper } from "./services/HandleWrapper.js";

export const isUjApi = !!getNativeByName("GetUjAPIVersion");
export const console = new Console();

const handleWrapper = new HandleWrapper();

setToHandleHolder(toHandleHolderSoft);

const builder = new HandleBuilder();

builder.addChainProperties(Widget, "widget");
builder.addChainProperties(Unit, "unit");
builder.addChainProperties(Player as any, "player");

builder.addMethods(Widget, "widget");
builder.addMethods(Unit, "unit");
builder.addMethods(Player as any, "player");

export { TextDecoder, TextEncoder } from "text-decoding";

export * from "./handles/Widget.js";
export * from "./handles/Unit.js";
export * from "./handles/Player.js";

// -- ONLY FOR dts-bundle

declare global {
    interface HandleHolder<S extends string = string> {
        get type(): S;
        payload: any;
        equals: (handle: HandleHolder<string> | null) => boolean;
    }
}
