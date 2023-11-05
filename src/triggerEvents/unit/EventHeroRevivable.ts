
import { Unit } from "../../handles/Unit.js";
import { GetRevivableUnit } from "../../utils/common.js";
import { TriggerUnitEvent } from "./Event.js";

export class TriggerUnitEventHeroRevivable extends TriggerUnitEvent<"heroRevivable"> {
    readonly revivableUnit: Unit;
    constructor() {
        super("heroRevivable");
        this.revivableUnit = GetRevivableUnit();
    }
}