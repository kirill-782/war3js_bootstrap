import { Widget, WidgetEventMap } from "./Widget.js";
import { CreateItemNe } from "../utils/common.js";

export interface ItemEventMap extends WidgetEventMap {}

export class Item<T extends ItemEventMap = ItemEventMap> extends Widget<T> {
    constructor(itemHandle: HandleHolder<"item">);
    constructor(itemHandle: Item);
    constructor(itemId: number, x: number, y: number);
    constructor(arg: number | Item | HandleHolder<"item">, x?: number, y?: number) {
        if (arg instanceof Item || arg instanceof HandleHolder) super(arg);
        else if (typeof arg === "number") {
            super(CreateItemNe(arg, x, y));
        } else {
            throw new TypeError("Unknown first arg");
        }
    }
}
