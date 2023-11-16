import { Unit } from "../../handles/Unit.js";
import { GetRescuer } from "../../utils/common.js";
import { TriggerUnitEvent } from "./TriggerUnitEvent.js";
import { fromHandleHolderSoft } from "../../utils/FromHandleHolder.js";

export class UnitEventRescued extends TriggerUnitEvent<"rescued"> {
    readonly rescuer: Unit;
    constructor() {
        super("rescued");
        this.rescuer = fromHandleHolderSoft(GetRescuer());
    }
}
