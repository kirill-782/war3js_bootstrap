import { Unit } from "../../handles/Unit.js";
import { TriggerUnitEvent } from "./TriggerUnitEvent.js";
import { fromHandleHolderSoft } from "../../utils/FromHandleHolder.js";
import {
    GetSpellAbility,
    GetSpellAbilityId,
    GetSpellTargetDestructable,
    GetSpellTargetItem,
    GetSpellTargetUnit,
    GetSpellTargetX,
    GetSpellTargetY,
    HAbility,
} from "../../utils/common.js";
import { Destructable } from "../../handles/Destructable.js";
import { Item } from "../../handles/Item.js";

export class UnitEventSpellEffect extends TriggerUnitEvent<"spellEffect"> {
    readonly abilityId: number;
    readonly ability: HAbility;
    readonly targetX: number;
    readonly targetY: number;
    // there is no "GetSpellTarget()" for this event that would return widget
    readonly targetDestructable: Destructable;
    readonly targetItem: Item;
    readonly targetUnit: Unit;
    constructor() {
        super("spellEffect");
        this.abilityId = GetSpellAbilityId();
        this.ability = fromHandleHolderSoft(GetSpellAbility());
        this.targetX = GetSpellTargetX();
        this.targetY = GetSpellTargetY();
        this.targetDestructable = fromHandleHolderSoft(GetSpellTargetDestructable());
        this.targetItem = fromHandleHolderSoft(GetSpellTargetItem());
        this.targetUnit = fromHandleHolderSoft(GetSpellTargetUnit());
    }
}
