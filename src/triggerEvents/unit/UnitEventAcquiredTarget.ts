import { Unit } from "../../handles/Unit.js";
import { GetEventTargetUnit } from "../../utils/common.js";
import { TriggerUnitEvent } from "./TriggerUnitEvent.js";

export class UnitEventAcquiredTarget extends TriggerUnitEvent<"acquiredTarget"> {
    readonly target: Unit;
    constructor() {
        super("acquiredTarget");
        this.target = GetEventTargetUnit();
    }
}
