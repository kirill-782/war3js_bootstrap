import { Unit } from "../../handles/Unit.js";
import { GetKillingUnit } from "../../utils/common.js";
import { UnitEvent } from "./UnitEvent.js";

export class UnitEventDeath extends UnitEvent<"death"> {
    readonly killingUnit: Unit;
    constructor() {
        super("death");
        this.killingUnit = GetKillingUnit();
    }
}
