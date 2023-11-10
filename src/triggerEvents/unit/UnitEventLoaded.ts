import { Unit } from "../../handles/Unit.js";
import { GetTransportUnit } from "../../utils/common.js";
import { UnitEvent } from "./UnitEvent.js";

export class UnitEventLoaded extends UnitEvent<"loaded"> {
    readonly transport: Unit;
    constructor() {
        super("loaded");
        this.transport = GetTransportUnit();
    }
}
