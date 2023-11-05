export class TriggerEvent<E extends string = string> {
    readonly event: E
    constructor(event: E) {
        this.event = event;
    }
}