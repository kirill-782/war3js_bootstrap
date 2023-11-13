import { Unit } from "../../handles/Unit.js";
import { GetConstructedStructure } from "../../utils/common.js";
import { TriggerUnitEvent } from "./TriggerUnitEvent.js";

export class UnitEventConstructFinish extends TriggerUnitEvent<"constructFinish"> {
    readonly constructedStructure: Unit;
    constructor() {
        super("constructFinish");
        this.constructedStructure = GetConstructedStructure();
    }
}
