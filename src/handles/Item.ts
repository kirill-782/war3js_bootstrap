import { getNativeByName } from "@war3js/unsafe";
import { Widget, WidgetEventMap } from "./Widget.js";

export interface ItemEventMap extends WidgetEventMap {}

const CreateItem = getNativeByName<HandleHolder<"item">, [number, number, number]>("CreateItem", false, true);

export class Item<T extends ItemEventMap = ItemEventMap> extends Widget<T> {
    constructor(itemHandle: HandleHolder<"item">);
    constructor(itemHandle: Item);
    constructor(itemId: number, x: number, y: number);
    constructor(arg: number | Item | HandleHolder<"item">, x?: number, y?: number) {
        if (arg instanceof Item || arg instanceof HandleHolder) super(arg);
        else if (typeof arg === "number") {
            super(CreateItem(arg, x, y));
        } else {
            throw new TypeError("Unknown first arg");
        }
    }
}
