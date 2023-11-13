import { Unit } from "../../handles/Unit.js";
import { GetEventTargetUnit } from "../../utils/common.js";
import { TriggerUnitEvent } from "./TriggerUnitEvent.js";

export class UnitEventTargetInRange extends TriggerUnitEvent<"targetInRange"> {
    readonly target: Unit;
    constructor() {
        super("targetInRange");
        this.target = GetEventTargetUnit();
    }
}
