
import { Item } from "../../handles/Item.js";
import { GetManipulatedItem } from "../../utils/common.js";
import { TriggerUnitEvent } from "./Event.js";

export class TriggerUnitEventDropItem extends TriggerUnitEvent<"dropItem"> {
    readonly droppedItem: Item;
    constructor() {
        super("dropItem");
        this.droppedItem = GetManipulatedItem();
    }
}