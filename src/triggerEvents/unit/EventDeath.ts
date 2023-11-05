import { Unit } from "../../handles/Unit.js";
import { GetKillingUnit } from "../../utils/common.js";
import { TriggerUnitEvent } from "./Event.js";

export class TriggerUnitEventDeath extends TriggerUnitEvent<"death"> {
    readonly killingUnit: Unit
    constructor() {
        super("death");
        this.killingUnit = GetKillingUnit();
    }
}