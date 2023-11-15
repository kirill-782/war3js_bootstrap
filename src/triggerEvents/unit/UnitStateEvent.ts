import { TriggerUnitEvent } from "./TriggerUnitEvent.js";

export class UnitStateEvent extends TriggerUnitEvent {
    constructor() {
        super("unitstate");
    }
}
