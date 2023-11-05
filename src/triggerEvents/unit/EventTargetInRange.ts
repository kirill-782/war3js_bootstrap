import { Unit } from "../../handles/Unit.js";
import { GetEventTargetUnit } from "../../utils/common.js";
import { TriggerUnitEvent } from "./Event.js";

export class TriggerUnitEventTargetInRange extends TriggerUnitEvent<"targetInRange"> {
    readonly target: Unit
    constructor() {
        super("targetInRange");
        this.target = GetEventTargetUnit();
    }
}