import { GetTrainedUnitType } from "../../utils/common.js";
import { UnitEvent } from "./UnitEvent.js";

export class UnitEventTrainStart extends UnitEvent<"trainStart"> {
    readonly trainedUnitType: number;
    constructor() {
        super("trainStart");
        this.trainedUnitType = GetTrainedUnitType();
    }
}
