
import { Unit } from "../../handles/Unit.js";
import { GetSummonedUnit } from "../../utils/common.js";
import { TriggerUnitEvent } from "./Event.js";

export class TriggerUnitEventSummon extends TriggerUnitEvent<"summon"> {
    readonly summonedUnit: Unit;
    constructor() {
        super("summon");
        this.summonedUnit = GetSummonedUnit();
    }
}