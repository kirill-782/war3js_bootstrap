import { Unit } from "../../handles/Unit.js";
import { GetRescuer } from "../../utils/common.js";
import { TriggerUnitEvent } from "./Event.js";

export class TriggerUnitEventRescued extends TriggerUnitEvent<"rescued"> {
    readonly rescuer: Unit
    constructor() {
        super("rescued");
        this.rescuer = GetRescuer();
    }
}