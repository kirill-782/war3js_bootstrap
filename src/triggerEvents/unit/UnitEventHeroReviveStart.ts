import { Unit } from "../../handles/Unit.js";
import { GetRevivingUnit } from "../../utils/common.js";
import { UnitEvent } from "./UnitEvent.js";

export class UnitEventHeroReviveStart extends UnitEvent<"heroReviveStart"> {
    readonly revivingUnit: Unit;
    constructor() {
        super("heroReviveStart");
        this.revivingUnit = GetRevivingUnit();
    }
}
