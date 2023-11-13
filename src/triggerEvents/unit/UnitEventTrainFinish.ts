import { Unit } from "../../handles/Unit.js";
import { GetTrainedUnit } from "../../utils/common.js";
import { TriggerUnitEvent } from "./TriggerUnitEvent.js";

export class UnitEventTrainFinish extends TriggerUnitEvent<"trainFinish"> {
    readonly trainedUnit: Unit;
    constructor() {
        super("trainFinish");
        this.trainedUnit = GetTrainedUnit();
    }
}
