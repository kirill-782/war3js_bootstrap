import { EventEmitter } from "@war3js/events";
import { getNativeByName } from "./unsafe.js";
import { Handle } from "./handles/Handle.js";

const Player = getNativeByName<HandleHolder<string>, [number]>("Player");

const ee = new Handle({} as any);

ee.addListener("error", function() {
    this
})