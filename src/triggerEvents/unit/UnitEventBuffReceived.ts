import { Unit } from "../../handles/Unit.js";
import { TriggerUnitEvent } from "./TriggerUnitEvent.js";
import { fromHandleHolderSoft } from "../../utils/FromHandleHolder.js";
import { GetTriggerBuff, GetTriggerBuffSourceAbility, GetTriggerBuffSourceUnit, HAbility, HBuff } from "../../utils/common.js";

export class UnitEventBuffReceived extends TriggerUnitEvent<"buffReceived"> {
    readonly recievedBuff: HBuff;
    readonly sourceAbility: HAbility;
    readonly sourceUnit: Unit;
    constructor() {
        super("buffReceived");
        this.recievedBuff = fromHandleHolderSoft(GetTriggerBuff());
        this.sourceAbility = fromHandleHolderSoft(GetTriggerBuffSourceAbility());
        this.sourceUnit = fromHandleHolderSoft(GetTriggerBuffSourceUnit());
    }
}
