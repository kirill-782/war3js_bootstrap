import { GetResearched } from "../../utils/common.js";
import { TriggerUnitEvent } from "./Event.js";

export class TriggerUnitEventResearchStart extends TriggerUnitEvent<"researchStart"> {
    readonly researched: number
    constructor() {
        super("researchStart");
        this.researched = GetResearched();
    }
}