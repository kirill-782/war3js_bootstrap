import { Unit } from "../../handles/Unit.js";
import { GetRevivingUnit } from "../../utils/common.js";
import { TriggerUnitEvent } from "./TriggerUnitEvent.js";
import { fromHandleHolderSoft } from "../../utils/FromHandleHolder.js";

export class UnitEventHeroReviveFinish extends TriggerUnitEvent<"heroReviveFinish"> {
    readonly revivingUnit: Unit;
    constructor() {
        super("heroReviveFinish");
        this.revivingUnit = fromHandleHolderSoft(GetRevivingUnit());
    }
}
