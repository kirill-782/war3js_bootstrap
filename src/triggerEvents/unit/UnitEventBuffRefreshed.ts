import { Unit } from "../../handles/Unit.js";
import { TriggerUnitEvent } from "./TriggerUnitEvent.js";
import { fromHandleHolderSoft } from "../../utils/FromHandleHolder.js";
import { GetTriggerBuff, GetTriggerBuffSourceAbility, GetTriggerBuffSourceUnit, HAbility, HBuff } from "../../utils/common.js";

export class UnitEventBuffRefreshed extends TriggerUnitEvent<"buffRefreshed"> {
    readonly recievedBuff: HBuff;
    readonly sourceAbility: HAbility;
    readonly sourceUnit: Unit;
    constructor() {
        super("buffRefreshed");
        this.recievedBuff = fromHandleHolderSoft(GetTriggerBuff());
        this.sourceAbility = fromHandleHolderSoft(GetTriggerBuffSourceAbility());
        this.sourceUnit = fromHandleHolderSoft(GetTriggerBuffSourceUnit());
    }
}
