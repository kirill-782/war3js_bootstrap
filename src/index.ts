import { setToHandleHolder, getNativeByName } from "@war3js/unsafe";

import { Console } from "./console/Console.js";
import { toHandleHolderSoft } from "./utils/ToHandleHolder.js";
import { HandleBuilder } from "./services/HandleBuilder.js";
import { Widget } from "./handles/Widget.js";
import { Unit } from "./handles/Unit.js";
import { Player } from "./handles/Player.js";
import { Destructable } from "./handles/Destructable.js";
import { Item } from "./handles/Item.js";

export const isUjApi = !!getNativeByName("GetUjAPIVersion");
export const console = new Console();

setToHandleHolder(toHandleHolderSoft);

const builder = new HandleBuilder();

builder.addChainProperties(Widget, "widget");
builder.addChainProperties(Unit, "unit");
builder.addChainProperties(Player, "player");
builder.addChainProperties(Destructable, "destructable");
builder.addChainProperties(Item, "item");

builder.addMethods(Widget, "widget");
builder.addMethods(Unit, "unit");
builder.addMethods(Player, "player");
builder.addMethods(Destructable, "destructable");
builder.addMethods(Item, "item");

export { TextDecoder, TextEncoder } from "text-decoding";

export * from "./handles/Widget.js";
export * from "./handles/Unit.js";
export * from "./handles/Player.js";
export * from "./handles/Handle.js";
export * from "./handles/Destructable.js";
export * from "./handles/Item.js";

export { Event, JassCodeCallback, Location, Trigger, TriggerAction, UnitEvent, UnitState } from "./utils/common.js";

// -- ONLY FOR dts-bundle

declare global {
    /**
     * A low-level object that replaces the handle type in war3js.
     * It is not recommended to use it as an object, as some fields may start to be used by the war3js backend.
     */
    interface HandleHolder<S extends string = string> {
        /**
         * Returns jass handle type. For fake handles this is _enum.
         */
        get type(): S;
        /**
         * The library object this handle is bound to
         */
        payload: any;

        /**
         * Compares handle's internal pointers as numbers. ``null`` is interpreted as 0
         * @param handle another handle for compare
         * @returns true if jass
         */
        equals: (handle: HandleHolder<string> | null) => boolean;
    }
}
