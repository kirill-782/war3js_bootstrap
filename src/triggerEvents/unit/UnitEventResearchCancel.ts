import { GetResearched } from "../../utils/common.js";
import { UnitEvent } from "./UnitEvent.js";

export class UnitEventResearchCancel extends UnitEvent<"researchCancel"> {
    readonly researched: number;
    constructor() {
        super("researchCancel");
        this.researched = GetResearched();
    }
}
