import { Unit } from "../../handles/Unit.js";
import { GetEventTargetUnit } from "../../utils/common.js";
import { UnitEvent } from "./UnitEvent.js";

export class UnitEventTargetInRange extends UnitEvent<"targetInRange"> {
    readonly target: Unit;
    constructor() {
        super("targetInRange");
        this.target = GetEventTargetUnit();
    }
}
