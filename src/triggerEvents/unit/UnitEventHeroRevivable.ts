import { Unit } from "../../handles/Unit.js";
import { GetRevivableUnit } from "../../utils/common.js";
import { UnitEvent } from "./UnitEvent.js";

export class UnitEventHeroRevivable extends UnitEvent<"heroRevivable"> {
    readonly revivableUnit: Unit;
    constructor() {
        super("heroRevivable");
        this.revivableUnit = GetRevivableUnit();
    }
}
