
import { Item } from "../../handles/Item.js";
import { GetManipulatedItem } from "../../utils/common.js";
import { TriggerUnitEvent } from "./Event.js";

export class TriggerUnitEventPickupItem extends TriggerUnitEvent<"pickupItem"> {
    readonly pickedupItem: Item;
    constructor() {
        super("pickupItem");
        this.pickedupItem = GetManipulatedItem();
    }
}