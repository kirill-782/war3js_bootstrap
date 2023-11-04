import { Handle, HandleEventMap } from "./Handle.js";
import { Unit } from "./Unit.js";

export interface WidgetEventMap extends HandleEventMap {
    death: () => void;
    damaging: () => void;
    damaged: () => void;
}

export class Widget<T extends WidgetEventMap = WidgetEventMap> extends Handle<T> {
    constructor(handleHolder: HandleHolder<"widget" | "unit" | "item" | "destructable"> | Widget) {
        super(handleHolder);
    }
}
