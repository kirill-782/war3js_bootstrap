import { Unit } from "../../handles/Unit.js";
import { GetTrainedUnit } from "../../utils/common.js";
import { UnitEvent } from "./UnitEvent.js";

export class UnitEventTrainFinish extends UnitEvent<"trainFinish"> {
    readonly trainedUnit: Unit;
    constructor() {
        super("trainFinish");
        this.trainedUnit = GetTrainedUnit();
    }
}
