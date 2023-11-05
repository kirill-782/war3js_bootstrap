import { Unit } from "../../handles/Unit.js";
import { GetEventTargetUnit } from "../../utils/common.js";
import { TriggerUnitEvent } from "./Event.js";

export class TriggerUnitEventAcquiredTarget extends TriggerUnitEvent<"acquiredTarget"> {
    readonly target: Unit
    constructor() {
        super("acquiredTarget");
        this.target = GetEventTargetUnit();
    }
}