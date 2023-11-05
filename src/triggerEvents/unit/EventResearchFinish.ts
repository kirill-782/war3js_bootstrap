import { GetResearched } from "../../utils/common.js";
import { TriggerUnitEvent } from "./Event.js";

export class TriggerUnitEventResearchFinish extends TriggerUnitEvent<"researchFinish"> {
    readonly researched: number
    constructor() {
        super("researchFinish");
        this.researched = GetResearched();
    }
}