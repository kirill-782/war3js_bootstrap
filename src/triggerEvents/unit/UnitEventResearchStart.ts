import { GetResearched } from "../../utils/common.js";
import { UnitEvent } from "./UnitEvent.js";

export class UnitEventResearchStart extends UnitEvent<"researchStart"> {
    readonly researched: number;
    constructor() {
        super("researchStart");
        this.researched = GetResearched();
    }
}
