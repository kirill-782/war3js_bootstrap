import { GetTrainedUnitType } from "../../utils/common.js";
import { TriggerUnitEvent } from "./TriggerUnitEvent.js";

export class UnitEventTrainCancel extends TriggerUnitEvent<"trainCancel"> {
    readonly trainedUnitType: number;
    constructor() {
        super("trainCancel");
        this.trainedUnitType = GetTrainedUnitType();
    }
}
