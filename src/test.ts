import { getNativeByName } from "./unsafe.js";
import { Player, Unit } from "./index.js";


const PlayerNative = getNativeByName<HandleHolder<"player">, [number]>("Player");

const u = new Unit(new Player(PlayerNative(0)), 0, 0, 0, 0);
console.log(u);

u.addListener("death", () => {});


u.emit("death");