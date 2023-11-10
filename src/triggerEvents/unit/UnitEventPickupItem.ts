import { Item } from "../../handles/Item.js";
import { GetManipulatedItem } from "../../utils/common.js";
import { UnitEvent } from "./UnitEvent.js";

export class UnitEventPickupItem extends UnitEvent<"pickupItem"> {
    readonly pickedupItem: Item;
    constructor() {
        super("pickupItem");
        this.pickedupItem = GetManipulatedItem();
    }
}
