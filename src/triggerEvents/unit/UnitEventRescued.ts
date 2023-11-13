import { Unit } from "../../handles/Unit.js";
import { GetRescuer } from "../../utils/common.js";
import { TriggerUnitEvent } from "./TriggerUnitEvent.js";

export class UnitEventRescued extends TriggerUnitEvent<"rescued"> {
    readonly rescuer: Unit;
    constructor() {
        super("rescued");
        this.rescuer = GetRescuer();
    }
}
