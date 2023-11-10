import { Unit } from "../../handles/Unit.js";
import { GetSummonedUnit } from "../../utils/common.js";
import { UnitEvent } from "./UnitEvent.js";

export class UnitEventSummon extends UnitEvent<"summon"> {
    readonly summonedUnit: Unit;
    constructor() {
        super("summon");
        this.summonedUnit = GetSummonedUnit();
    }
}
