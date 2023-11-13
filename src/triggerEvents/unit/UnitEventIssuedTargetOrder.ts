import { Destructable } from "../../handles/Destructable.js";
import { Item } from "../../handles/Item.js";
import { Unit } from "../../handles/Unit.js";
import { Widget } from "../../handles/Widget.js";
import {
    GetIssuedOrderId,
    GetOrderTarget,
    GetOrderTargetDestructable,
    GetOrderTargetItem,
    GetOrderTargetUnit,
} from "../../utils/common.js";
import { TriggerUnitEvent } from "./TriggerUnitEvent.js";

export class UnitEventIssuedTargetOrder extends TriggerUnitEvent<"issuedTargetOrder"> {
    readonly issuedOrderId: number;
    readonly orderTarget: Widget;
    readonly orderTargetDestructable: Destructable;
    readonly orderTargetItem: Item;
    readonly orderTargetUnit: Unit;
    constructor() {
        super("issuedTargetOrder");
        this.issuedOrderId = GetIssuedOrderId();
        this.orderTarget = GetOrderTarget();
        this.orderTargetDestructable = GetOrderTargetDestructable();
        this.orderTargetItem = GetOrderTargetItem();
        this.orderTargetUnit = GetOrderTargetUnit();
    }
}
