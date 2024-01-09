import { HandleHolder } from "@war3js/unsafe";
import { Handle, HandleEventMap } from "./Handle.js";

export interface WidgetEventMap extends HandleEventMap {
    death: (event: any) => void;
    damaging: () => void;
    damaged: () => void;
}

export class Widget<T extends WidgetEventMap = WidgetEventMap> extends Handle<T> {
    constructor(handleHolder: HandleHolder<"widget" | "unit" | "item" | "destructable"> | Widget) {
        super(handleHolder);
    }
}
