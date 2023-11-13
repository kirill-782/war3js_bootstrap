import { Item } from "../../handles/Item.js";
import { GetManipulatedItem } from "../../utils/common.js";
import { TriggerUnitEvent } from "./TriggerUnitEvent.js";

export class UnitEventDropItem extends TriggerUnitEvent<"dropItem"> {
    readonly droppedItem: Item;
    constructor() {
        super("dropItem");
        this.droppedItem = GetManipulatedItem();
    }
}
