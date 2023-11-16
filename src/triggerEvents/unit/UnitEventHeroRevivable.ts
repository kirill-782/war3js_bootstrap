import { Unit } from "../../handles/Unit.js";
import { GetRevivableUnit } from "../../utils/common.js";
import { TriggerUnitEvent } from "./TriggerUnitEvent.js";
import { fromHandleHolderSoft } from "../../utils/FromHandleHolder.js";

export class UnitEventHeroRevivable extends TriggerUnitEvent<"heroRevivable"> {
    readonly revivableUnit: Unit;
    constructor() {
        super("heroRevivable");
        this.revivableUnit = fromHandleHolderSoft(GetRevivableUnit());
    }
}
