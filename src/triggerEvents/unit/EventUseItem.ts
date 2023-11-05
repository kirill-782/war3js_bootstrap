
import { Item } from "../../handles/Item.js";
import { GetManipulatedItem } from "../../utils/common.js";
import { TriggerUnitEvent } from "./Event.js";

export class TriggerUnitEventUseItem extends TriggerUnitEvent<"useItem"> {
    readonly usedItem: Item;
    constructor() {
        super("useItem");
        this.usedItem = GetManipulatedItem();
    }
}