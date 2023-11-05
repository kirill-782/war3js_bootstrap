import { GetIssuedOrderId } from "../../utils/common.js";
import { TriggerUnitEvent } from "./Event.js";

export class TriggerUnitEventIssuedOrder extends TriggerUnitEvent<"issuedOrder"> {
    readonly issuedOrderId: number
    constructor() {
        super("issuedOrder");
        this.issuedOrderId = GetIssuedOrderId();
    }
}