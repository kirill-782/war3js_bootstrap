import { setToHandleHolder, getNativeByName } from "@war3js/unsafe";

import { Console } from "./console/Console.js";
import { toHandleHolderSoft } from "./utils/ToHandleHolder.js";
import { HandleBuilder, InstanceApiBuilder } from "./services/ClassBuilder.js";
import { Widget } from "./handles/Widget.js";
import { Unit } from "./handles/Unit.js";
import { Player } from "./handles/Player.js";
import { Destructable } from "./handles/Destructable.js";
import { Item } from "./handles/Item.js";
import { HandleWrapper } from "./services/HandleWrapper.js";

import { Readable, Writable, Transform, Duplex, pipeline, finished } from "readable-stream";

export const stream: any = {
    Readable,
    Writable,
    Transform,
    Duplex,
    pipeline,
    finished,
};

Object.freeze(stream);

import * as _Buffer from "buffer";
import { AbilityData } from "./handles/instanceApi/AbilityData.js";

export const buffer: any = {
    ..._Buffer,
};

Object.freeze(buffer);

export const isUjApi = !!getNativeByName("GetUjAPIVersion");
export const console = new Console();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const wrapper = new HandleWrapper();

setToHandleHolder(toHandleHolderSoft);

const handleBuilder = new HandleBuilder();

handleBuilder.addChainProperties(Widget, "widget");
handleBuilder.addChainProperties(Unit, "unit");
handleBuilder.addChainProperties(Player, "player");
handleBuilder.addChainProperties(Destructable, "destructable");
handleBuilder.addChainProperties(Item, "item");

handleBuilder.addMethods(Widget, "widget");
handleBuilder.addMethods(Unit, "unit");
handleBuilder.addMethods(Player, "player");
handleBuilder.addMethods(Destructable, "destructable");
handleBuilder.addMethods(Item, "item");

const instanceApiBuilder = new InstanceApiBuilder();

instanceApiBuilder.appendAbilityData(AbilityData);

export * from "./handles/instanceApi/AbilityData.js";

export { IndexAccessArray } from "./services/ClassBuilder.js";

export { TextDecoder, TextEncoder } from "text-decoding";
export { Headers } from "@war3js/headers-polyfill";

export * from "./handles/Widget.js";
export * from "./handles/Unit.js";
export * from "./handles/Player.js";
export * from "./handles/Handle.js";
export * from "./handles/Destructable.js";
export * from "./handles/Item.js";

export {
    HEvent,
    JassCodeCallback,
    HLocation,
    HTrigger,
    HTriggerAction,
    HUnitEvent,
    HUnitState,
} from "./utils/common.js";

export { UnitState, LimitOp } from "./services/emitters/UnitStateEmiter.js";

export { Websocket } from "./services/websocket/Websocket.js";
