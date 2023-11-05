import { GetEventUnitState, UnitState } from "../../utils/common.js";
import { TriggerUnitEvent } from "./Event.js";

export class TriggerUnitEventStateLimit extends TriggerUnitEvent<"stateLimit"> {
    readonly eventUnitState: UnitState
    constructor() {
        super("stateLimit");
        this.eventUnitState = GetEventUnitState();
    }
}