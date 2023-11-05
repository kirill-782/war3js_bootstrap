import { Unit } from "../../handles/Unit.js";
import { GetConstructedStructure } from "../../utils/common.js";
import { TriggerUnitEvent } from "./Event.js";

export class TriggerUnitEventConstructFinish extends TriggerUnitEvent<"constructFinish"> {
    readonly constructedStructure: Unit
    constructor() {
        super("constructFinish");
        this.constructedStructure = GetConstructedStructure();
    }
}