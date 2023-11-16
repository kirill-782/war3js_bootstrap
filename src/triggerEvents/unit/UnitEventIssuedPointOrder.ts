import { GetIssuedOrderId, GetOrderPointX, GetOrderPointY } from "../../utils/common.js";
import { TriggerUnitEvent } from "./TriggerUnitEvent.js";

export class UnitEventIssuedPointOrder extends TriggerUnitEvent<"issuedPointOrder"> {
    readonly issuedOrderId: number;
    readonly orderPointX: number;
    readonly orderPointY: number;
    constructor() {
        super("issuedPointOrder");
        this.issuedOrderId = GetIssuedOrderId();
        this.orderPointX = GetOrderPointX();
        this.orderPointY = GetOrderPointY();
    }
}
