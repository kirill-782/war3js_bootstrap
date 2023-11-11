import { getNativeByName } from "@war3js/unsafe";
import { Widget, WidgetEventMap } from "./Widget.js";

export interface DestructableEventMap extends WidgetEventMap {}

const CreateDestructable = getNativeByName<HandleHolder<"item">, [number, number, number, number, number, number]>(
    "CreateDestructable",
    false,
    true,
);

export class Destructable<T extends DestructableEventMap = DestructableEventMap> extends Widget<T> {
    constructor(destructableHandle: HandleHolder<"item">);
    constructor(destructableHandle: Destructable);
    constructor(destructableId: number, x: number, y: number, face: number, scale: number, variation: number);
    constructor(
        arg: number | Destructable | HandleHolder<"item">,
        x?: number,
        y?: number,
        face?: number,
        scale?: number,
        variation?: number,
    ) {
        if (arg instanceof Destructable || arg instanceof HandleHolder) super(arg);
        else if (typeof arg === "number") {
            super(CreateDestructable(arg, x, y, face, scale, variation));
        } else {
            throw new TypeError("Unknown first arg");
        }
    }
}
