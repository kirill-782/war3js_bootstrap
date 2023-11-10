import { Item } from "../../handles/Item.js";
import { GetManipulatedItem } from "../../utils/common.js";
import { UnitEvent } from "./UnitEvent.js";

export class UnitEventUseItem extends UnitEvent<"useItem"> {
    readonly usedItem: Item;
    constructor() {
        super("useItem");
        this.usedItem = GetManipulatedItem();
    }
}
