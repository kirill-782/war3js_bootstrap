import { Unit } from "../../handles/Unit.js";
import { GetRevivingUnit } from "../../utils/common.js";
import { UnitEvent } from "./UnitEvent.js";

export class UnitEventHeroReviveFinish extends UnitEvent<"heroReviveFinish"> {
    readonly revivingUnit: Unit;
    constructor() {
        super("heroReviveFinish");
        this.revivingUnit = GetRevivingUnit();
    }
}
