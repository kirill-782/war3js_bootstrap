/* eslint-disable @typescript-eslint/no-unused-vars */

import { __getDatabaseGlobalType, getNativeByName } from "@war3js/unsafe";
import { Player, Unit } from "./index.js";
import { TriggerUnitEvent } from "./triggerEvents/unit/TriggerUnitEvent.js";
import { isNode } from "./utils/runtime.js";
import { Readable } from "stream";

import { curl_easy_init, constants, curl_easy_setopt, curl_easy_perform } from "@war3js/curl";

const curl = curl_easy_init();

curl_easy_setopt(curl, constants.CURLOPT_URL, "wss://test");

curl_easy_perform(curl, () => {
    // Ready
});

const hpal = new Unit(Player.getById(0), 1215324524, 0, 0, 0);
//const hpalI = Unit.createIllusionFromUnit(hpal);

hpal.on("selected", (e) => {
    //e.triggerUnit.kill();
});

const PlayerNative = getNativeByName<HandleHolder<"player">, [number]>("Player");

console.log(isNode);

console.log(__getDatabaseGlobalType);

const u = new Unit(Player.getById(0), 0, 0, 0, 0);
console.log(u);

u.addListener("damaged", () => {});
u.addListener("selected", (event) => {
    console.log(event);
});

u.addListener("acquiredTarget", () => {});

u.emit("damaged");
u.emit("selected", new TriggerUnitEvent<"selected">("selected"));
