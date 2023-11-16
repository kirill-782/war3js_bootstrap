import { Item } from "../../handles/Item.js";
import { GetManipulatedItem } from "../../utils/common.js";
import { TriggerUnitEvent } from "./TriggerUnitEvent.js";
import { fromHandleHolderSoft } from "../../utils/FromHandleHolder.js";

export class UnitEventPickupItem extends TriggerUnitEvent<"pickupItem"> {
    readonly pickedupItem: Item;
    constructor() {
        super("pickupItem");
        this.pickedupItem = fromHandleHolderSoft(GetManipulatedItem());
    }
}
