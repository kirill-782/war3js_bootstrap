import { GetResearched } from "../../utils/common.js";
import { TriggerUnitEvent } from "./TriggerUnitEvent.js";

export class UnitEventResearchFinish extends TriggerUnitEvent<"researchFinish"> {
    readonly researched: number;
    constructor() {
        super("researchFinish");
        this.researched = GetResearched();
    }
}
