import { GetTrainedUnitType } from "../../utils/common.js";
import { TriggerUnitEvent } from "./Event.js";

export class TriggerUnitEventTrainCancel extends TriggerUnitEvent<"trainCancel"> {
    readonly trainedUnitType: number
    constructor() {
        super("trainCancel");
        this.trainedUnitType = GetTrainedUnitType();
    }
}