import { Player } from "../../handles/Player.js";
import { GetEventDetectingPlayer } from "../../utils/common.js";
import { UnitEvent } from "./UnitEvent.js";

export class UnitEventDetected extends UnitEvent<"detected"> {
    readonly detectingPlayer: Player;
    constructor() {
        super("detected");
        this.detectingPlayer = GetEventDetectingPlayer();
    }
}
