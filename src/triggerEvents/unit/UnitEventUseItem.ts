import { Item } from "../../handles/Item.js";
import { GetManipulatedItem } from "../../utils/common.js";
import { TriggerUnitEvent } from "./TriggerUnitEvent.js";
import { fromHandleHolderSoft } from "../../utils/FromHandleHolder.js";

export class UnitEventUseItem extends TriggerUnitEvent<"useItem"> {
    readonly usedItem: Item;
    constructor() {
        super("useItem");
        this.usedItem = fromHandleHolderSoft(GetManipulatedItem());
    }
}
