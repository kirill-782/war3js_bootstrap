import TypedEmitter, { EventMap } from "typed-emitter";
import { Widget, WidgetEventMap } from "./Widget.js";

import { getNativeByName } from "../unsafe.js";
import { Player } from "./Player.js";
import { EventEmitterHook, OnEmitterAddListener } from "../utils/EventEmitterHook.js";
import { unitEmiter } from "../services/emitters/UnitEmiter.js";

const CreateUnit = getNativeByName<HandleHolder<"unit">, [HandleHolder<"player">, number, number, number, number]>(
    "CreateUnit",
    false,
    true
);

export interface UnitEventMap extends WidgetEventMap {
    selected: () => void;
    deselected: () => void;
}

export interface Unit {
    get handle(): HandleHolder<"unit">;
}

export class Unit<T extends UnitEventMap = UnitEventMap> extends Widget<T> {
    constructor(arg: Unit | Player, unitId?: number, x?: number, y?: number, facing?: number) {
        if (arg instanceof Unit) super(arg);
        else if (arg instanceof Player) {
            super(CreateUnit(arg.handle, unitId, x, y, facing));
        } else {
            throw new TypeError("Unknown first arg");
        }

        EventEmitterHook.hookAddListener(Unit);
    }

    public onEmitterAddListener(event: string | number | symbol, listener: (...args: any[]) => void) {
        if (unitEmiter.isSupport(event) && typeof event === "string") {
            unitEmiter.subscribe(event, this as Unit<UnitEventMap>);
        }
    }
}
