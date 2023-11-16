import { Unit } from "../../handles/Unit.js";
import { GetKillingUnit } from "../../utils/common.js";
import { TriggerUnitEvent } from "./TriggerUnitEvent.js";
import { fromHandleHolderSoft } from "../../utils/FromHandleHolder.js";

export class UnitEventDeath extends TriggerUnitEvent<"death"> {
    readonly killingUnit: Unit;
    constructor() {
        super("death");
        this.killingUnit = fromHandleHolderSoft(GetKillingUnit());
    }
}
