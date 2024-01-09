import { HandleHolder } from "@war3js/unsafe";
import { CreateAbilityNe } from "../utils/common.js";
import { Handle, HandleEventMap } from "./Handle.js";

export interface AbilityEventMap extends HandleEventMap {}

export interface Ability {
    get handle(): HandleHolder<"ability">;
}

export class Ability<T extends HandleEventMap = HandleEventMap> extends Handle<T> {
    constructor(itemHandle: HandleHolder<"ability">);
    constructor(itemHandle: Ability);
    constructor(abilCode: number);
    constructor(arg: number | Ability | HandleHolder<"ability">) {
        if (arg instanceof Ability || arg instanceof HandleHolder) super(arg);
        else if (typeof arg === "number") {
            super(CreateAbilityNe(arg));
        } else {
            throw new TypeError("Unknown first arg");
        }
    }
}
