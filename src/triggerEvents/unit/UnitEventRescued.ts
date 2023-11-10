import { Unit } from "../../handles/Unit.js";
import { GetRescuer } from "../../utils/common.js";
import { UnitEvent } from "./UnitEvent.js";

export class UnitEventRescued extends UnitEvent<"rescued"> {
    readonly rescuer: Unit;
    constructor() {
        super("rescued");
        this.rescuer = GetRescuer();
    }
}
