import { Unit } from "../../handles/Unit.js";
import { GetAttacker } from "../../utils/common.js";
import { TriggerUnitEvent } from "./TriggerUnitEvent.js";

export class UnitEventAttacked extends TriggerUnitEvent<"attacked"> {
    readonly attacker: Unit;
    constructor() {
        super("attacked");
        this.attacker = GetAttacker();
    }
}
