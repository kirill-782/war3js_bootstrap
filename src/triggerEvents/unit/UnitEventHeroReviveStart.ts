import { Unit } from "../../handles/Unit.js";
import { GetRevivingUnit } from "../../utils/common.js";
import { TriggerUnitEvent } from "./TriggerUnitEvent.js";

export class UnitEventHeroReviveStart extends TriggerUnitEvent<"heroReviveStart"> {
    readonly revivingUnit: Unit;
    constructor() {
        super("heroReviveStart");
        this.revivingUnit = GetRevivingUnit();
    }
}
