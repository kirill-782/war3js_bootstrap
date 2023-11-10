import { Unit } from "../../handles/Unit.js";
import { GetEventTargetUnit } from "../../utils/common.js";
import { UnitEvent } from "./UnitEvent.js";

export class UnitEventAcquiredTarget extends UnitEvent<"acquiredTarget"> {
    readonly target: Unit;
    constructor() {
        super("acquiredTarget");
        this.target = GetEventTargetUnit();
    }
}
