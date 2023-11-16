import { GetEventUnitState, HUnitState } from "../../utils/common.js";
import { TriggerUnitEvent } from "./TriggerUnitEvent.js";

export class UnitEventStateLimit extends TriggerUnitEvent<"stateLimit"> {
    readonly eventUnitState: HUnitState;
    constructor() {
        super("stateLimit");
        this.eventUnitState = GetEventUnitState();
    }
}
