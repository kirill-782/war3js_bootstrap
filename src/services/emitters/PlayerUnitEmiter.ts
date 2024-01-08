import { Player } from "../../handles/Player.js";
import {
    CreateTriggerNe,
    DestroyTrigger,
    HTrigger,
    TriggerAddActionNe,
    TriggerRegisterPlayerUnitEventNe,
} from "../../utils/common.js";

export type PlayerUnitEventType = keyof typeof stringToHandle;

const stringToHandle = {};

type PlayerUnitTriggerInfo = {
    [key: string]: HTrigger;
};

const dispatchPlayerUnitEvent = (player: Player, eventType: string) => {
    switch (eventType) {
    }
};

export class PlayerUnitEmiter {
    private playerUnitToTriggerMap: Map<Player, PlayerUnitTriggerInfo>;

    public constructor() {
        this.playerUnitToTriggerMap = new Map();
    }

    public isSupport(eventType: string | number | symbol): boolean {
        return eventType in stringToHandle;
    }

    public subscribe(eventType: PlayerUnitEventType, player: Player): void {
        if (!player.handle || !stringToHandle[eventType]) return;

        const registerPlayerUnitEvents = this.playerUnitToTriggerMap.get(player) || {};
        if (registerPlayerUnitEvents[eventType]) return;

        const newTrigger = CreateTriggerNe();

        TriggerRegisterPlayerUnitEventNe(newTrigger, player.handle, stringToHandle[eventType]);
        TriggerAddActionNe(newTrigger, () => {
            dispatchPlayerUnitEvent(player, eventType);
        });

        registerPlayerUnitEvents[eventType] = newTrigger;
        this.playerUnitToTriggerMap.set(player, registerPlayerUnitEvents);
    }

    public unsubscribe(eventType: string, player: Player): void {
        const registerPlayerUnitEvents = this.playerUnitToTriggerMap.get(player);
        if (!registerPlayerUnitEvents) return;

        const trigger = registerPlayerUnitEvents[eventType];
        if (!trigger) return;

        DestroyTrigger(trigger);
        delete registerPlayerUnitEvents[eventType];

        this.playerUnitToTriggerMap.set(player, registerPlayerUnitEvents);
    }
}

export const unitEmiter = new PlayerUnitEmiter();
