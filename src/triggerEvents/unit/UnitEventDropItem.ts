import { Item } from "../../handles/Item.js";
import { GetManipulatedItem } from "../../utils/common.js";
import { UnitEvent } from "./UnitEvent.js";

export class UnitEventDropItem extends UnitEvent<"dropItem"> {
    readonly droppedItem: Item;
    constructor() {
        super("dropItem");
        this.droppedItem = GetManipulatedItem();
    }
}
