import { Unit } from "../../handles/Unit.js";
import { GetAttacker } from "../../utils/common.js";
import { TriggerUnitEvent } from "./Event.js";

export class TriggerUnitEventAttacked extends TriggerUnitEvent<"attacked"> {
    readonly attacker: Unit
    constructor() {
        super("attacked");
        this.attacker = GetAttacker();
    }
}