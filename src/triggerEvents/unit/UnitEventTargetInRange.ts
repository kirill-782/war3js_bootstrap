import { Unit } from "../../handles/Unit.js";
import { GetEventTargetUnit } from "../../utils/common.js";
import { TriggerUnitEvent } from "./TriggerUnitEvent.js";
import { fromHandleHolderSoft } from "../../utils/FromHandleHolder.js";

export class UnitEventTargetInRange extends TriggerUnitEvent<"targetInRange"> {
    readonly target: Unit;
    constructor() {
        super("targetInRange");
        this.target = fromHandleHolderSoft(GetEventTargetUnit());
    }
}
