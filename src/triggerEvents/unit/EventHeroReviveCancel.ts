
import { Unit } from "../../handles/Unit.js";
import { GetRevivingUnit } from "../../utils/common.js";
import { TriggerUnitEvent } from "./Event.js";

export class TriggerUnitEventHeroReviveCancel extends TriggerUnitEvent<"heroReviveCancel"> {
    readonly revivingUnit: Unit;
    constructor() {
        super("heroReviveCancel");
        this.revivingUnit = GetRevivingUnit();
    }
}