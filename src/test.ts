import { getNativeByName } from "@war3js/unsafe";
import { Player, Unit } from "./index.js";

const PlayerNative = getNativeByName<HandleHolder<"player">, [number]>("Player");

const u = new Unit(Player.getById(0), 0, 0, 0, 0);
console.log(u);

u.addListener("damaged", () => {});

u.emit("damaged");
