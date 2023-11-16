import { Unit } from "../../handles/Unit.js";
import {
    CreateTriggerNe,
    DestroyTrigger,
    Trigger,
    TriggerAddActionNe,
    TriggerRegisterUnitEventNe,
    UnitEvents,
} from "../../utils/common.js";
import { TriggerUnitEvent } from "../../triggerEvents/unit/TriggerUnitEvent.js";
import { UnitEventDeath } from "../../triggerEvents/unit/UnitEventDeath.js";
import { UnitEventAcquiredTarget } from "../../triggerEvents/unit/UnitEventAcquiredTarget.js";
import { UnitEventAttacked } from "../../triggerEvents/unit/UnitEventAttacked.js";
import { UnitEventConstructFinish } from "../../triggerEvents/unit/UnitEventConstructFinish.js";
import { UnitEventDetected } from "../../triggerEvents/unit/UnitEventDetected.js";
import { UnitEventStateLimit } from "../../triggerEvents/unit/UnitEventStateLimit.js";
import { UnitEventTargetInRange } from "../../triggerEvents/unit/UnitEventTargetInRange.js";
import { UnitEventRescued } from "../../triggerEvents/unit/UnitEventRescued.js";
import { UnitEventTrainStart } from "../../triggerEvents/unit/UnitEventTrainStart.js";
import { UnitEventTrainCancel } from "../../triggerEvents/unit/UnitEventTrainCancel.js";
import { UnitEventTrainFinish } from "../../triggerEvents/unit/UnitEventTrainFinish.js";
import { UnitEventResearchStart } from "../../triggerEvents/unit/UnitEventResearchStart.js";
import { UnitEventResearchCancel } from "../../triggerEvents/unit/UnitEventResearchCancel.js";
import { UnitEventResearchFinish } from "../../triggerEvents/unit/UnitEventResearchFinish.js";
import { UnitEventIssuedOrder } from "../../triggerEvents/unit/UnitEventIssuedOrder.js";
import { UnitEventIssuedPointOrder } from "../../triggerEvents/unit/UnitEventIssuedPointOrder.js";
import { UnitEventIssuedTargetOrder } from "../../triggerEvents/unit/UnitEventIssuedTargetOrder.js";
import { UnitEventHeroSkill } from "../../triggerEvents/unit/UnitEventHeroSkill.js";
import { UnitEventHeroRevivable } from "../../triggerEvents/unit/UnitEventHeroRevivable.js";
import { UnitEventHeroReviveStart } from "../../triggerEvents/unit/UnitEventHeroReviveStart.js";
import { UnitEventHeroReviveCancel } from "../../triggerEvents/unit/UnitEventHeroReviveCancel.js";
import { UnitEventHeroReviveFinish } from "../../triggerEvents/unit/UnitEventHeroReviveFinish.js";
import { UnitEventSummon } from "../../triggerEvents/unit/UnitEventSummon.js";
import { UnitEventDropItem } from "../../triggerEvents/unit/UnitEventDropItem.js";
import { UnitEventPickupItem } from "../../triggerEvents/unit/UnitEventPickupItem.js";
import { UnitEventUseItem } from "../../triggerEvents/unit/UnitEventUseItem.js";
import { UnitEventLoaded } from "../../triggerEvents/unit/UnitEventLoaded.js";

export type UnitEventType = keyof typeof stringToHandle;

const stringToHandle = {
    damaged: UnitEvents.EVENT_UNIT_DAMAGED,
    damaging: UnitEvents.EVENT_UNIT_DAMAGING,
    selected: UnitEvents.EVENT_UNIT_SELECTED,
    deselected: UnitEvents.EVENT_UNIT_DESELECTED,
    death: UnitEvents.EVENT_UNIT_DEATH,
    decay: UnitEvents.EVENT_UNIT_DECAY,
    detected: UnitEvents.EVENT_UNIT_DETECTED,
    hidden: UnitEvents.EVENT_UNIT_HIDDEN,
    stateLimit: UnitEvents.EVENT_UNIT_STATE_LIMIT,
    acquiredTarget: UnitEvents.EVENT_UNIT_ACQUIRED_TARGET,
    targetInRange: UnitEvents.EVENT_UNIT_TARGET_IN_RANGE,
    attacked: UnitEvents.EVENT_UNIT_ATTACKED,
    rescued: UnitEvents.EVENT_UNIT_RESCUED,
    constructCancel: UnitEvents.EVENT_UNIT_CONSTRUCT_CANCEL,
    constructFinish: UnitEvents.EVENT_UNIT_CONSTRUCT_FINISH,
    upgradeStart: UnitEvents.EVENT_UNIT_UPGRADE_START,
    upgradeCancel: UnitEvents.EVENT_UNIT_UPGRADE_CANCEL,
    upgradeFinish: UnitEvents.EVENT_UNIT_UPGRADE_FINISH,
    trainStart: UnitEvents.EVENT_UNIT_TRAIN_START,
    trainCancel: UnitEvents.EVENT_UNIT_TRAIN_CANCEL,
    trainFinish: UnitEvents.EVENT_UNIT_TRAIN_FINISH,
    researchStart: UnitEvents.EVENT_UNIT_RESEARCH_START,
    researchCancel: UnitEvents.EVENT_UNIT_RESEARCH_CANCEL,
    researchFinish: UnitEvents.EVENT_UNIT_RESEARCH_FINISH,
    issuedOrder: UnitEvents.EVENT_UNIT_ISSUED_ORDER,
    issuedPointOrder: UnitEvents.EVENT_UNIT_ISSUED_POINT_ORDER,
    issuedTargetOrder: UnitEvents.EVENT_UNIT_ISSUED_TARGET_ORDER,
    heroLevel: UnitEvents.EVENT_UNIT_HERO_LEVEL,
    heroSkill: UnitEvents.EVENT_UNIT_HERO_SKILL,
    heroRevivable: UnitEvents.EVENT_UNIT_HERO_REVIVABLE,
    heroReviveStart: UnitEvents.EVENT_UNIT_HERO_REVIVE_START,
    heroReviveCancel: UnitEvents.EVENT_UNIT_HERO_REVIVE_CANCEL,
    heroReviveFinish: UnitEvents.EVENT_UNIT_HERO_REVIVE_FINISH,
    summon: UnitEvents.EVENT_UNIT_SUMMON,
    dropItem: UnitEvents.EVENT_UNIT_DROP_ITEM,
    pickupItem: UnitEvents.EVENT_UNIT_PICKUP_ITEM,
    useItem: UnitEvents.EVENT_UNIT_USE_ITEM,
    loaded: UnitEvents.EVENT_UNIT_LOADED,
    attackFinished: UnitEvents.EVENT_UNIT_ATTACK_FINISHED,
    decayFinished: UnitEvents.EVENT_UNIT_DECAY_FINISHED,
};

type UnitTriggerInfo = {
    [key: string]: Trigger;
};

const dispatchUnitEvent = (unit: Unit, eventType: string) => {
    switch (eventType) {
        case "selected":
        case "deselected":
        case "decay":
        case "hidden":
        case "constructCancel":
        case "upgradeStart":
        case "upgradeFinish":
        case "upgradeCancel":
        case "heroLevel":
        case "attackFinished":
        case "decayFinished":
            unit.emit(eventType, new TriggerUnitEvent(eventType));
            break;
        case "damaged":
            unit.emit("damaged"); // TODO: add event arg when UnitEventDamaged will be done
            break;
        case "damaging":
            unit.emit("damaging"); // TODO: add event arg when UnitEventDamaging will be done
            break;
        case "death":
            unit.emit("death", new UnitEventDeath());
            break;
        case "acquiredTarget":
            unit.emit("acquiredTarget", new UnitEventAcquiredTarget());
            break;
        case "attacked":
            unit.emit("attacked", new UnitEventAttacked());
            break;
        case "constructFinish":
            unit.emit("constructFinish", new UnitEventConstructFinish());
            break;
        case "detected":
            unit.emit("detected", new UnitEventDetected());
            break;
        case "stateLimit":
            unit.emit("stateLimit", new UnitEventStateLimit());
            break;
        case "targetInRange":
            unit.emit("targetInRange", new UnitEventTargetInRange());
            break;
        case "rescued":
            unit.emit("rescued", new UnitEventRescued());
            break;
        case "trainStart":
            unit.emit("trainStart", new UnitEventTrainStart());
            break;
        case "trainCancel":
            unit.emit("trainCancel", new UnitEventTrainCancel());
            break;
        case "trainFinish":
            unit.emit("trainFinish", new UnitEventTrainFinish());
            break;
        case "researchStart":
            unit.emit("researchStart", new UnitEventResearchStart());
            break;
        case "researchCancel":
            unit.emit("researchCancel", new UnitEventResearchCancel());
            break;
        case "researchFinish":
            unit.emit("researchFinish", new UnitEventResearchFinish());
            break;
        case "issuedOrder":
            unit.emit("issuedOrder", new UnitEventIssuedOrder());
            break;
        case "issuedPointOrder":
            unit.emit("issuedPointOrder", new UnitEventIssuedPointOrder());
            break;
        case "issuedTargetOrder":
            unit.emit("issuedTargetOrder", new UnitEventIssuedTargetOrder());
            break;
        case "heroSkill":
            unit.emit("heroSkill", new UnitEventHeroSkill());
            break;
        case "heroRevivable":
            unit.emit("heroRevivable", new UnitEventHeroRevivable());
            break;
        case "heroReviveStart":
            unit.emit("heroReviveStart", new UnitEventHeroReviveStart());
            break;
        case "heroReviveCancel":
            unit.emit("heroReviveCancel", new UnitEventHeroReviveCancel());
            break;
        case "heroReviveFinish":
            unit.emit("heroReviveFinish", new UnitEventHeroReviveFinish());
            break;
        case "summon":
            unit.emit("summon", new UnitEventSummon());
            break;
        case "dropItem":
            unit.emit("dropItem", new UnitEventDropItem());
            break;
        case "pickupItem":
            unit.emit("pickupItem", new UnitEventPickupItem());
            break;
        case "useItem":
            unit.emit("useItem", new UnitEventUseItem());
            break;
        case "loaded":
            unit.emit("loaded", new UnitEventLoaded());
            break;
        default:
            throw new TypeError(`Unexpected eventType: ${eventType}`);
    }
};

export class UnitEmiter {
    private unitToTriggerMap: Map<Unit, UnitTriggerInfo>;

    public constructor() {
        this.unitToTriggerMap = new Map();
    }

    public isSupport(eventType: string | number | symbol): boolean {
        return eventType in stringToHandle;
    }

    public subscribe(eventType: UnitEventType, unit: Unit): void {
        if (!unit.handle || !stringToHandle[eventType]) return;

        const registerUnitEvents = this.unitToTriggerMap.get(unit) || {};
        if (registerUnitEvents[eventType]) return;

        const newTrigger = CreateTriggerNe();

        TriggerRegisterUnitEventNe(newTrigger, unit.handle, stringToHandle[eventType]);
        TriggerAddActionNe(newTrigger, () => {
            dispatchUnitEvent(unit, eventType);
        });

        registerUnitEvents[eventType] = newTrigger;
        this.unitToTriggerMap.set(unit, registerUnitEvents);
    }

    public unsubscribe(eventType: string, unit: Unit): void {
        const registerUnitEvents = this.unitToTriggerMap.get(unit);
        if (!registerUnitEvents) return;

        const trigger = registerUnitEvents[eventType];
        if (!trigger) return;

        DestroyTrigger(trigger);
        delete registerUnitEvents[eventType];

        this.unitToTriggerMap.set(unit, registerUnitEvents);
    }
}

export const unitEmiter = new UnitEmiter();
