import { GetResearched } from "../../utils/common.js";
import { UnitEvent } from "./UnitEvent.js";

export class UnitEventResearchFinish extends UnitEvent<"researchFinish"> {
    readonly researched: number;
    constructor() {
        super("researchFinish");
        this.researched = GetResearched();
    }
}
