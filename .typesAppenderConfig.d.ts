import { Destructable } from "./src/handles/Destructable.ts";
import { Handle } from "./src/handles/Handle.ts";
import { Player } from "./src/handles/Player.ts";
import { Unit } from "./src/handles/Unit.ts";
import { Widget } from "./src/handles/Widget.ts";
import { JassCodeCallback } from "./src/utils/common.ts";

declare const __ColnfigOnlyBundlePath = "./build/dts-bundle/out.d.ts";
declare const __ColnfigOnlyFixedBundleOutPath = "./build/fullTypes/bootstrap.d.ts";
declare const __ColnfigOnlyNativesOutPath = "./build/fullTypes/natives.d.ts";

interface __ColnfigOnlyTypeToHandle {
    I: number;
    R: number;
    B: boolean;
    S: string;
    C: JassCodeCallback;

    handle: Handle;
    player: Player;
    declareestructable: Destructable;
    widget: Widget;
    unit: Unit;
}
