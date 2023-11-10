import { Unit } from "../../handles/Unit.js";
import { GetConstructedStructure } from "../../utils/common.js";
import { UnitEvent } from "./UnitEvent.js";

export class UnitEventConstructFinish extends UnitEvent<"constructFinish"> {
    readonly constructedStructure: Unit;
    constructor() {
        super("constructFinish");
        this.constructedStructure = GetConstructedStructure();
    }
}
