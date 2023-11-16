import { Unit } from "../../handles/Unit.js";
import { GetTrainedUnit } from "../../utils/common.js";
import { TriggerUnitEvent } from "./TriggerUnitEvent.js";
import { fromHandleHolderSoft } from "../../utils/FromHandleHolder.js";

export class UnitEventTrainFinish extends TriggerUnitEvent<"trainFinish"> {
    readonly trainedUnit: Unit;
    constructor() {
        super("trainFinish");
        this.trainedUnit = fromHandleHolderSoft(GetTrainedUnit());
    }
}
