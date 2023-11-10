/* eslint-disable @typescript-eslint/no-unused-vars */

import { getNativeByName } from "@war3js/unsafe";
import { Player, Unit } from "./index.js";
import { UnitEvent } from "./triggerEvents/unit/UnitEvent.js";

const PlayerNative = getNativeByName<HandleHolder<"player">, [number]>("Player");

const u = new Unit(Player.getById(0), 0, 0, 0, 0);
console.log(u);

u.addListener("damaged", () => {});
u.addListener("selected", (event) => {
    console.log(event);
});

u.emit("damaged");
u.emit("selected", new UnitEvent<"selected">("selected"));
