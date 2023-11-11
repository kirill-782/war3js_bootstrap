import { getNativeByName } from "@war3js/unsafe";
import { Handle, HandleEventMap } from "./Handle.js";

const PlayerNative = getNativeByName<HandleHolder<"player">, [number]>("Player");
const GetLocalPlayer = getNativeByName<HandleHolder<"player">, []>("GetLocalPlayer");

export interface PlayerEventMap extends HandleEventMap {}




export interface Player {
    get handle(): HandleHolder<"player">;
}




export class Player<T extends PlayerEventMap = PlayerEventMap> extends Handle<T> {
    public constructor(handleHolder: HandleHolder<"player">);
    public constructor(arg1: HandleHolder<"player"> | Player) {
        super(arg1);
    }

    public static getById<T extends Player = Player>(slot: number) {
        return PlayerNative(slot).payload as T;
    }

    public static localPlayer<T extends Player = Player>() {
        return GetLocalPlayer().payload as T;
    }
}
