import { GetTrainedUnitType } from "../../utils/common.js";
import { TriggerUnitEvent } from "./TriggerUnitEvent.js";

export class UnitEventTrainStart extends TriggerUnitEvent<"trainStart"> {
    readonly trainedUnitType: number;
    constructor() {
        super("trainStart");
        this.trainedUnitType = GetTrainedUnitType();
    }
}
