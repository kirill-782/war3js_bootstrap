import { Unit } from "../../handles/Unit.js";
import { getNativeByName } from "@war3js/unsafe";
import {
    CreateTrigger,
    DestroyTrigger,
    Trigger,
    TriggerAddAction,
    TriggerRegisterUnitEvent,
    UnitEvents,
} from "../../utils/common.js";

export type UnitEventType = "damaged" | "damaging" | "selected" | "deselected" | "death";

const stringToHandle: Record<string, HandleHolder<"unitevent">> = {
    damaged: UnitEvents.EVENT_UNIT_DAMAGED,
    damaging: UnitEvents.EVENT_UNIT_DAMAGING,
    selected: UnitEvents.EVENT_UNIT_SELECTED,
    deselected: UnitEvents.EVENT_UNIT_DESELECTED,
    death: UnitEvents.EVENT_UNIT_DEATH,
};

type UnitTriggerInfo = {
    [key: string]: Trigger;
};

export class UnitEmiter {
    private unitToTriggerMap: Map<Unit, UnitTriggerInfo>;

    public constructor() {
        this.unitToTriggerMap = new Map();
    }

    public isSupport(eventType: string | number | symbol): boolean {
        if (typeof eventType === "symbol") return false;
        return stringToHandle[eventType] !== null;
    }

    public subscribe(eventType: string, unit: Unit): void {
        if (!unit.handle || !stringToHandle[eventType]) return;

        let registerUnitEvents = this.unitToTriggerMap.get(unit) || {};
        if (registerUnitEvents[eventType]) return;

        const newTrigger = CreateTrigger();

        TriggerRegisterUnitEvent(newTrigger, unit.handle, stringToHandle[eventType]);
        TriggerAddAction(newTrigger, () => {
            switch (eventType as UnitEventType) {
                case "damaged":
                    unit.emit("damaged");
                    break;
                case "damaging":
                    unit.emit("damaging");
                    break;
                case "death":
                    unit.emit("death");
                    break;
                case "selected":
                    unit.emit("selected");
                    break;
                case "deselected":
                    unit.emit("deselected");
                    break;
            }
        });

        registerUnitEvents[eventType] = newTrigger;
        this.unitToTriggerMap.set(unit, registerUnitEvents);
    }

    public unsubscribe(eventType: string, unit: Unit): void {
        let registerUnitEvents = this.unitToTriggerMap.get(unit);
        if (!registerUnitEvents) return;

        const trigger = registerUnitEvents[eventType];
        if (!trigger) return;

        DestroyTrigger(trigger);
        delete registerUnitEvents[eventType];

        this.unitToTriggerMap.set(unit, registerUnitEvents);
    }
}

export const unitEmiter = new UnitEmiter();
