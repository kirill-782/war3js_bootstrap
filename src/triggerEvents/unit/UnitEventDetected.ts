import { Player } from "../../handles/Player.js";
import { GetEventDetectingPlayer } from "../../utils/common.js";
import { TriggerUnitEvent } from "./TriggerUnitEvent.js";

export class UnitEventDetected extends TriggerUnitEvent<"detected"> {
    readonly detectingPlayer: Player;
    constructor() {
        super("detected");
        this.detectingPlayer = GetEventDetectingPlayer();
    }
}
