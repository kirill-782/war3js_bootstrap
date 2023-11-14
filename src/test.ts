/* eslint-disable @typescript-eslint/no-unused-vars */

import { getNativeByName } from "@war3js/unsafe";
import { Player, Unit } from "./index.js";
import { TriggerUnitEvent } from "./triggerEvents/unit/TriggerUnitEvent.js";

const PlayerNative = getNativeByName<HandleHolder<"player">, [number]>("Player");

const u = new Unit(Player.getById(0), 0, 0, 0, 0);

u.addListener("damaged", () => {});
u.addListener("selected", (event) => {
    console.log(event);
});

u.addListener("acquiredTarget", () => {});

u.emit("damaged");
u.emit("selected", new TriggerUnitEvent<"selected">("selected"));
