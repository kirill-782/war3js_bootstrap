import { Item } from "../../handles/Item.js";
import { GetManipulatedItem } from "../../utils/common.js";
import { TriggerUnitEvent } from "./TriggerUnitEvent.js";

export class UnitEventUseItem extends TriggerUnitEvent<"useItem"> {
    readonly usedItem: Item;
    constructor() {
        super("useItem");
        this.usedItem = GetManipulatedItem();
    }
}
