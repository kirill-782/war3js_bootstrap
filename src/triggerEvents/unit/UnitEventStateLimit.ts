import { GetEventUnitState, UnitState } from "../../utils/common.js";
import { TriggerUnitEvent } from "./TriggerUnitEvent.js";

export class UnitEventStateLimit extends TriggerUnitEvent<"stateLimit"> {
    readonly eventUnitState: UnitState;
    constructor() {
        super("stateLimit");
        this.eventUnitState = GetEventUnitState();
    }
}
