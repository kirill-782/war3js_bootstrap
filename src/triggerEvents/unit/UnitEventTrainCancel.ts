import { GetTrainedUnitType } from "../../utils/common.js";
import { UnitEvent } from "./UnitEvent.js";

export class UnitEventTrainCancel extends UnitEvent<"trainCancel"> {
    readonly trainedUnitType: number;
    constructor() {
        super("trainCancel");
        this.trainedUnitType = GetTrainedUnitType();
    }
}
