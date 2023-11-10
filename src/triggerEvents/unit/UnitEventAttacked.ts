import { Unit } from "../../handles/Unit.js";
import { GetAttacker } from "../../utils/common.js";
import { UnitEvent } from "./UnitEvent.js";

export class UnitEventAttacked extends UnitEvent<"attacked"> {
    readonly attacker: Unit;
    constructor() {
        super("attacked");
        this.attacker = GetAttacker();
    }
}
