import { TriggerUnitEvent } from "./TriggerUnitEvent.js";
import { fromHandleHolderSoft } from "../../utils/FromHandleHolder.js";
import { GetTriggerProjectile, GetTriggerProjectileSource, HProjectile } from "../../utils/common.js";
import { Unit } from "../../handles/Unit.js";

export class UnitEventProjectileHit extends TriggerUnitEvent<"projectileHit"> {
    readonly source:Unit;
    readonly projectile:HProjectile;
    constructor() {
        super("projectileHit");
        this.source = fromHandleHolderSoft(GetTriggerProjectileSource());
        this.projectile = fromHandleHolderSoft(GetTriggerProjectile());
    }
}
