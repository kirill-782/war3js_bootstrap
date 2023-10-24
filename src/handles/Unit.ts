import TypedEmitter, { EventMap } from "typed-emitter";
import { Widget, WidgetEventMap } from "./Widget.js";

import { getNativeByName } from "../unsafe.js";
import { Player } from "./Player.js";

const CreateUnit = getNativeByName<HandleHolder<"unit">, [HandleHolder<"player">, number, number, number, number]>(
  "CreateUnit",
  false,
  true
);

export interface UnitEventMap extends WidgetEventMap {
  death: (a: string) => void;
  damaging: () => void;
  damaged: () => void;
}

export class Unit<T extends UnitEventMap = UnitEventMap> extends Widget<T> {
  constructor(arg: Unit | Player, unitId?: number, x?: number, y?: number, facing?: number) {
    if (arg instanceof Unit) super(arg);
    else if (arg instanceof Player) {
      super(CreateUnit(arg.handle, unitId, x, y, facing));
    } else {
      throw new TypeError("Unknown first arg");
    }
  }
}
