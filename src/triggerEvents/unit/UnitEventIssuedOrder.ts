import { GetIssuedOrderId } from "../../utils/common.js";
import { TriggerUnitEvent } from "./TriggerUnitEvent.js";

export class UnitEventIssuedOrder extends TriggerUnitEvent<"issuedOrder"> {
    readonly issuedOrderId: number;
    constructor() {
        super("issuedOrder");
        this.issuedOrderId = GetIssuedOrderId();
    }
}
