import { GetResearched } from "../../utils/common.js";
import { TriggerUnitEvent } from "./Event.js";

export class TriggerUnitEventResearchCancel extends TriggerUnitEvent<"researchCancel"> {
    readonly researched: number
    constructor() {
        super("researchCancel");
        this.researched = GetResearched();
    }
}