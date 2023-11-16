import { Widget } from "../../handles/Widget.js";
import { GetIssuedOrderId, GetOrderTarget } from "../../utils/common.js";
import { TriggerUnitEvent } from "./TriggerUnitEvent.js";
import { fromHandleHolderSoft } from "../../utils/FromHandleHolder.js";

export class UnitEventIssuedTargetOrder extends TriggerUnitEvent<"issuedTargetOrder"> {
    readonly issuedOrderId: number;
    readonly orderTarget: Widget;

    constructor() {
        super("issuedTargetOrder");
        this.issuedOrderId = GetIssuedOrderId();
        this.orderTarget = fromHandleHolderSoft(GetOrderTarget());
    }
}
