import { GetTrainedUnitType } from "../../utils/common.js";
import { TriggerUnitEvent } from "./Event.js";

export class TriggerUnitEventTrainStart extends TriggerUnitEvent<"trainStart"> {
    readonly trainedUnitType: number
    constructor() {
        super("trainStart");
        this.trainedUnitType = GetTrainedUnitType();
    }
}