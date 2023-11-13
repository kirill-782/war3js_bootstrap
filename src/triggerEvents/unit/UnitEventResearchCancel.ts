import { GetResearched } from "../../utils/common.js";
import { TriggerUnitEvent } from "./TriggerUnitEvent.js";

export class UnitEventResearchCancel extends TriggerUnitEvent<"researchCancel"> {
    readonly researched: number;
    constructor() {
        super("researchCancel");
        this.researched = GetResearched();
    }
}
