import { Unit } from "../../handles/Unit.js";
import { GetRevivingUnit } from "../../utils/common.js";
import { UnitEvent } from "./UnitEvent.js";

export class UnitEventHeroReviveCancel extends UnitEvent<"heroReviveCancel"> {
    readonly revivingUnit: Unit;
    constructor() {
        super("heroReviveCancel");
        this.revivingUnit = GetRevivingUnit();
    }
}
