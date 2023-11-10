import { GetEventUnitState, UnitState } from "../../utils/common.js";
import { UnitEvent } from "./UnitEvent.js";

export class UnitEventStateLimit extends UnitEvent<"stateLimit"> {
    readonly eventUnitState: UnitState;
    constructor() {
        super("stateLimit");
        this.eventUnitState = GetEventUnitState();
    }
}
