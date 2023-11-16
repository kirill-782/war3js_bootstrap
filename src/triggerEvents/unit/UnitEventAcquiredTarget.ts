import { Unit } from "../../handles/Unit.js";
import { GetEventTargetUnit } from "../../utils/common.js";
import { TriggerUnitEvent } from "./TriggerUnitEvent.js";
import { fromHandleHolderSoft } from "../../utils/FromHandleHolder.js";

export class UnitEventAcquiredTarget extends TriggerUnitEvent<"acquiredTarget"> {
    readonly target: Unit;
    constructor() {
        super("acquiredTarget");
        this.target = fromHandleHolderSoft(GetEventTargetUnit());
    }
}
