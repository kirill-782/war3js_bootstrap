import { Unit } from "../../handles/Unit.js";
import { UnitEventType } from "../../services/emitters/UnitEmiter.js";
import { GetTriggerUnit } from "../../utils/common.js";
import { TriggerEvent } from "../TriggerEvent.js";

export class UnitEvent<E extends UnitEventType = UnitEventType> extends TriggerEvent {
    readonly triggerUnit: Unit;
    constructor(event: E) {
        super(event);
        this.triggerUnit = GetTriggerUnit();
    }
}
