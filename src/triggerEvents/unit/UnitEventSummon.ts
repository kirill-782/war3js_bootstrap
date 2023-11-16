import { Unit } from "../../handles/Unit.js";
import { GetSummonedUnit } from "../../utils/common.js";
import { TriggerUnitEvent } from "./TriggerUnitEvent.js";
import { fromHandleHolderSoft } from "../../utils/FromHandleHolder.js";

export class UnitEventSummon extends TriggerUnitEvent<"summon"> {
    readonly summonedUnit: Unit;
    constructor() {
        super("summon");
        this.summonedUnit = fromHandleHolderSoft(GetSummonedUnit());
    }
}
