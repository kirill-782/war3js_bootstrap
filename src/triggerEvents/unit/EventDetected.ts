import { Player } from "../../handles/Player.js";
import { GetEventDetectingPlayer } from "../../utils/common.js";
import { TriggerUnitEvent } from "./Event.js";

export class TriggerUnitEventDetected extends TriggerUnitEvent<"detected"> {
    readonly detectingPlayer: Player
    constructor() {
        super("detected");
        this.detectingPlayer = GetEventDetectingPlayer();
    }
}