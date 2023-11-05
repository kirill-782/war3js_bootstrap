
import { Unit } from "../../handles/Unit.js";
import { GetRevivingUnit } from "../../utils/common.js";
import { TriggerUnitEvent } from "./Event.js";

export class TriggerUnitEventHeroReviveFinish extends TriggerUnitEvent<"heroReviveFinish"> {
    readonly revivingUnit: Unit;
    constructor() {
        super("heroReviveFinish");
        this.revivingUnit = GetRevivingUnit();
    }
}