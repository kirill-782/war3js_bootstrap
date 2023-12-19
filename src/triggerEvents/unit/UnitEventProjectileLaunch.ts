import { TriggerUnitEvent } from "./TriggerUnitEvent.js";
import { fromHandleHolderSoft } from "../../utils/FromHandleHolder.js";
import { Widget } from "../../handles/Widget.js";
import { GetTriggerProjectile, GetTriggerProjectileTarget, HProjectile } from "../../utils/common.js";

export class UnitEventProjectileLaunch extends TriggerUnitEvent<"projectileLaunch"> {
    readonly target:Widget;
    readonly projecitle:HProjectile;
    constructor() {
        super("projectileLaunch");
        this.target = fromHandleHolderSoft(GetTriggerProjectileTarget());
        this.projecitle = fromHandleHolderSoft(GetTriggerProjectile());
    }
}
