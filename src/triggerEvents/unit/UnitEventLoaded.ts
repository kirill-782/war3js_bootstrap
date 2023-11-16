import { Unit } from "../../handles/Unit.js";
import { GetTransportUnit } from "../../utils/common.js";
import { TriggerUnitEvent } from "./TriggerUnitEvent.js";
import { fromHandleHolderSoft } from "../../utils/FromHandleHolder.js";

export class UnitEventLoaded extends TriggerUnitEvent<"loaded"> {
    readonly transport: Unit;
    constructor() {
        super("loaded");
        this.transport = fromHandleHolderSoft(GetTransportUnit());
    }
}
