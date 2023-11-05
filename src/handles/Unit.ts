import TypedEmitter, { EventMap } from "typed-emitter";
import { Widget, WidgetEventMap } from "./Widget.js";

import { getNativeByName } from "@war3js/unsafe";
import { Player } from "./Player.js";
import { EventEmitterHook, OnEmitterAddListener } from "../utils/EventEmitterHook.js";
import { UnitEventType, unitEmiter } from "../services/emitters/UnitEmiter.js";
import { TriggerUnitEvent } from "../triggerEvents/unit/Event.js";
import { TriggerUnitEventDeath } from "../triggerEvents/unit/EventDeath.js";
import { TriggerUnitEventDetected } from "../triggerEvents/unit/EventDetected.js";
import { TriggerUnitEventStateLimit } from "../triggerEvents/unit/EventStateLimit.js";
import { TriggerUnitEventAcquiredTarget } from "../triggerEvents/unit/EventAcquiredTarget.js";
import { TriggerUnitEventTargetInRange } from "../triggerEvents/unit/EventTargetInRange.js";
import { TriggerUnitEventAttacked } from "../triggerEvents/unit/EventAttacked.js";
import { TriggerUnitEventRescued } from "../triggerEvents/unit/EventRescued.js";
import { TriggerUnitEventConstructFinish } from "../triggerEvents/unit/EventConstructFinish.js";
import { TriggerUnitEventTrainStart } from "../triggerEvents/unit/EventTrainStart.js";
import { TriggerUnitEventTrainCancel } from "../triggerEvents/unit/EventTrainCancel.js";
import { TriggerUnitEventTrainFinish } from "../triggerEvents/unit/EventTrainFinish.js";
import { TriggerUnitEventResearchStart } from "../triggerEvents/unit/EventResearchStart.js";
import { TriggerUnitEventResearchCancel } from "../triggerEvents/unit/EventResearchCancel.js";
import { TriggerUnitEventResearchFinish } from "../triggerEvents/unit/EventResearchFinish.js";
import { TriggerUnitEventIssuedOrder } from "../triggerEvents/unit/EventIssuedOrder.js";
import { TriggerUnitEventIssuedPointOrder } from "../triggerEvents/unit/EventIssuedPointOrder.js";
import { TriggerUnitEventIssuedTargetOrder } from "../triggerEvents/unit/EventIssuedTargetOrder.js";
import { TriggerUnitEvenHeroSkill } from "../triggerEvents/unit/EventHeroSkill.js";
import { TriggerUnitEventHeroRevivable } from "../triggerEvents/unit/EventHeroRevivable.js";
import { TriggerUnitEventHeroReviveStart } from "../triggerEvents/unit/EventHeroReviveStart.js";
import { TriggerUnitEventHeroReviveCancel } from "../triggerEvents/unit/EventHeroReviveCancel.js";
import { TriggerUnitEventHeroReviveFinish } from "../triggerEvents/unit/EventHeroReviveFinish.js";
import { TriggerUnitEventSummon } from "../triggerEvents/unit/EventSummon.js";
import { TriggerUnitEventDropItem } from "../triggerEvents/unit/EventDropItem.js";
import { TriggerUnitEventPickupItem } from "../triggerEvents/unit/EventPickupItem.js";
import { TriggerUnitEventUseItem } from "../triggerEvents/unit/EventUseItem.js";
import { TriggerUnitEventLoaded } from "../triggerEvents/unit/EventLoaded.js";

const CreateUnit = getNativeByName<HandleHolder<"unit">, [HandleHolder<"player">, number, number, number, number]>(
    "CreateUnit",
    false,
    true
);

export interface UnitEventMap extends WidgetEventMap {
    selected: (event: TriggerUnitEvent<"selected">) => void;
    deselected: (event: TriggerUnitEvent<"deselected">) => void;
    damaged: () => void; // TODO: add event arg when TriggerUnitEventDamaged will be done
    damaging: () => void; // TODO: add event arg when TriggerUnitEventDamaging will be done
    death: (event: TriggerUnitEventDeath) => void;
    decay: (event: TriggerUnitEvent<"decay">) => void;
    detected: (event: TriggerUnitEventDetected) => void;
    hidden: (event: TriggerUnitEvent<"hidden">) => void;
    stateLimit: (event: TriggerUnitEventStateLimit) => void;
    acquiredTarget: (event: TriggerUnitEventAcquiredTarget) => void;
    targetInRange: (event: TriggerUnitEventTargetInRange) => void;
    attacked: (event: TriggerUnitEventAttacked) => void;
    rescued: (event: TriggerUnitEventRescued) => void;
    constructCancel: (event: TriggerUnitEvent<"constructCancel">) => void;
    constructFinish: (event: TriggerUnitEventConstructFinish) => void;
    upgradeStart: (event: TriggerUnitEvent<"upgradeStart">) => void;
    upgradeCancel: (event: TriggerUnitEvent<"upgradeCancel">) => void;
    upgradeFinish: (event: TriggerUnitEvent<"upgradeFinish">) => void;
    trainStart: (event: TriggerUnitEventTrainStart) => void;
    trainCancel: (event: TriggerUnitEventTrainCancel) => void;
    trainFinish: (event: TriggerUnitEventTrainFinish) => void;
    researchStart: (event: TriggerUnitEventResearchStart) => void;
    researchCancel: (event: TriggerUnitEventResearchCancel) => void;
    researchFinish: (event: TriggerUnitEventResearchFinish) => void;
    issuedOrder: (event: TriggerUnitEventIssuedOrder) => void;
    issuedPointOrder: (event: TriggerUnitEventIssuedPointOrder) => void;
    issuedTargetOrder: (event: TriggerUnitEventIssuedTargetOrder) => void;
    heroLevel: (event: TriggerUnitEvent<"heroLevel">) => void;
    heroSkill: (event: TriggerUnitEvenHeroSkill) => void;
    heroRevivable: (event: TriggerUnitEventHeroRevivable) => void;
    heroReviveStart: (event: TriggerUnitEventHeroReviveStart) => void;
    heroReviveCancel: (event: TriggerUnitEventHeroReviveCancel) => void;
    heroReviveFinish: (event: TriggerUnitEventHeroReviveFinish) => void;
    summon: (event: TriggerUnitEventSummon) => void;
    dropItem: (event: TriggerUnitEventDropItem) => void;
    pickupItem: (event: TriggerUnitEventPickupItem) => void;
    useItem: (event: TriggerUnitEventUseItem) => void;
    loaded: (event: TriggerUnitEventLoaded) => void;
    attackFinished: (event: TriggerUnitEvent<"attackFinished">) => void;
    decayFinished: (event: TriggerUnitEvent<"decayFinished">) => void;
}

export interface Unit {
    get handle(): HandleHolder<"unit">;
}

export class Unit<T extends UnitEventMap = UnitEventMap> extends Widget<T> {
    constructor(unitHandle: HandleHolder<"unit">);
    constructor(unitobject: Unit);
    constructor(unitobject: Player, unitId: number, x: number, y: number, facing: number);
    constructor(arg: Unit | Player | HandleHolder<"unit">, unitId?: number, x?: number, y?: number, facing?: number) {
        if (arg instanceof Unit || arg instanceof HandleHolder) super(arg);
        else if (arg instanceof Player) {
            super(CreateUnit(arg.handle, unitId, x, y, facing));
        } else {
            throw new TypeError("Unknown first arg");
        }

        EventEmitterHook.hookAddListener(Unit);
    }

    public onEmitterAddListener(event: UnitEventType | number | symbol, listener: (...args: any[]) => void) {
        if (unitEmiter.isSupport(event) && typeof event === "string") {
            unitEmiter.subscribe(event, this);
        }
    }
}
