import { GetIssuedOrderId } from "../../utils/common.js";
import { UnitEvent } from "./UnitEvent.js";

export class UnitEventIssuedOrder extends UnitEvent<"issuedOrder"> {
    readonly issuedOrderId: number;
    constructor() {
        super("issuedOrder");
        this.issuedOrderId = GetIssuedOrderId();
    }
}
