import { Unit } from "../../handles/Unit.js";
import { GetTrainedUnit } from "../../utils/common.js";
import { TriggerUnitEvent } from "./Event.js";

export class TriggerUnitEventTrainFinish extends TriggerUnitEvent<"trainFinish"> {
    readonly trainedUnit: Unit
    constructor() {
        super("trainFinish");
        this.trainedUnit = GetTrainedUnit();
    }
}