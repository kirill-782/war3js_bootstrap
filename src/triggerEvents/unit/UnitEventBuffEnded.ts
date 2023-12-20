import { Unit } from "../../handles/Unit.js";
import { TriggerUnitEvent } from "./TriggerUnitEvent.js";
import { fromHandleHolderSoft } from "../../utils/FromHandleHolder.js";
import { GetTriggerBuff, GetTriggerBuffSourceAbility, GetTriggerBuffSourceUnit, HAbility, HBuff } from "../../utils/common.js";

export class UnitEventBuffEnded extends TriggerUnitEvent<"buffEnded"> {
    readonly recievedBuff: HBuff;
    readonly sourceAbility: HAbility;
    readonly sourceUnit: Unit;
    constructor() {
        super("buffEnded");
        this.recievedBuff = fromHandleHolderSoft(GetTriggerBuff());
        this.sourceAbility = fromHandleHolderSoft(GetTriggerBuffSourceAbility());
        this.sourceUnit = fromHandleHolderSoft(GetTriggerBuffSourceUnit());
    }
}
