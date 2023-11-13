import { GetResearched } from "../../utils/common.js";
import { TriggerUnitEvent } from "./TriggerUnitEvent.js";

export class UnitEventResearchStart extends TriggerUnitEvent<"researchStart"> {
    readonly researched: number;
    constructor() {
        super("researchStart");
        this.researched = GetResearched();
    }
}
