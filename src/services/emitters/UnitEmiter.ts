import { Unit } from "../../handles/Unit.js";
import { getNativeByName } from "@war3js/unsafe";
import {
    CreateTrigger,
    DestroyTrigger,
    Trigger,
    TriggerAddAction,
    TriggerRegisterUnitEvent,
    UnitEvents,
} from "../../utils/common.js";
import { TriggerUnitEvent } from "../../triggerEvents/unit/Event.js";
import { TriggerUnitEventDeath } from "../../triggerEvents/unit/EventDeath.js";
import { TriggerUnitEventAcquiredTarget } from "../../triggerEvents/unit/EventAcquiredTarget.js";
import { TriggerUnitEventAttacked } from "../../triggerEvents/unit/EventAttacked.js";
import { TriggerUnitEventConstructFinish } from "../../triggerEvents/unit/EventConstructFinish.js";
import { TriggerUnitEventDetected } from "../../triggerEvents/unit/EventDetected.js";
import { TriggerUnitEventStateLimit } from "../../triggerEvents/unit/EventStateLimit.js";
import { TriggerUnitEventTargetInRange } from "../../triggerEvents/unit/EventTargetInRange.js";
import { TriggerUnitEventRescued } from "../../triggerEvents/unit/EventRescued.js";
import { TriggerUnitEventTrainStart } from "../../triggerEvents/unit/EventTrainStart.js";
import { TriggerUnitEventTrainCancel } from "../../triggerEvents/unit/EventTrainCancel.js";
import { TriggerUnitEventTrainFinish } from "../../triggerEvents/unit/EventTrainFinish.js";
import { TriggerUnitEventResearchStart } from "../../triggerEvents/unit/EventResearchStart.js";
import { TriggerUnitEventResearchCancel } from "../../triggerEvents/unit/EventResearchCancel.js";
import { TriggerUnitEventResearchFinish } from "../../triggerEvents/unit/EventResearchFinish.js";
import { TriggerUnitEventIssuedOrder } from "../../triggerEvents/unit/EventIssuedOrder.js";
import { TriggerUnitEventIssuedPointOrder } from "../../triggerEvents/unit/EventIssuedPointOrder.js";
import { TriggerUnitEventIssuedTargetOrder } from "../../triggerEvents/unit/EventIssuedTargetOrder.js";
import { TriggerUnitEvenHeroSkill } from "../../triggerEvents/unit/EventHeroSkill.js";
import { TriggerUnitEventHeroRevivable } from "../../triggerEvents/unit/EventHeroRevivable.js";
import { TriggerUnitEventHeroReviveStart } from "../../triggerEvents/unit/EventHeroReviveStart.js";
import { TriggerUnitEventHeroReviveCancel } from "../../triggerEvents/unit/EventHeroReviveCancel.js";
import { TriggerUnitEventHeroReviveFinish } from "../../triggerEvents/unit/EventHeroReviveFinish.js";
import { TriggerUnitEventSummon } from "../../triggerEvents/unit/EventSummon.js";
import { TriggerUnitEventDropItem } from "../../triggerEvents/unit/EventDropItem.js";
import { TriggerUnitEventPickupItem } from "../../triggerEvents/unit/EventPickupItem.js";
import { TriggerUnitEventUseItem } from "../../triggerEvents/unit/EventUseItem.js";
import { TriggerUnitEventLoaded } from "../../triggerEvents/unit/EventLoaded.js";

export type UnitEventType = "damaged" | "damaging" | "selected" | "deselected" | "death" | "decay" | "detected" | "hidden" | "stateLimit" |
    "acquiredTarget" | "targetInRange" | "attacked" | "rescued" | "constructCancel" | "constructFinish" | "upgradeStart" | "upgradeCancel" | "upgradeFinish" |
    "trainStart" | "trainCancel" | "trainFinish" | "researchStart" | "researchCancel" | "researchFinish" | "issuedOrder" | "issuedPointOrder" | "issuedTargetOrder" |
    "heroLevel" | "heroSkill" | "heroRevivable" | "heroReviveStart" | "heroReviveCancel" | "heroReviveFinish" | "summon" | "dropItem" | "pickupItem" | "useItem" |
    "loaded" | "attackFinished" | "decayFinished"


const stringToHandle: Record<string, HandleHolder<"unitevent">> = {
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

export class UnitEmiter {
    private unitToTriggerMap: Map<Unit, UnitTriggerInfo>;

    public constructor() {
        this.unitToTriggerMap = new Map();
    }

    public isSupport(eventType: string | number | symbol): boolean {
        if (typeof eventType === "symbol") return false;
        return stringToHandle[eventType] !== null;
    }

    public subscribe(eventType: UnitEventType, unit: Unit): void {
        if (!unit.handle || !stringToHandle[eventType]) return;

        let registerUnitEvents = this.unitToTriggerMap.get(unit) || {};
        if (registerUnitEvents[eventType]) return;

        const newTrigger = CreateTrigger();

        TriggerRegisterUnitEvent(newTrigger, unit.handle, stringToHandle[eventType]);
        TriggerAddAction(newTrigger, () => {
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
                    unit.emit("damaged"); // TODO: add event arg when TriggerUnitEventDamaged will be done
                    break;
                case "damaging":
                    unit.emit("damaging"); // TODO: add event arg when TriggerUnitEventDamaging will be done
                    break;
                case "death":
                    unit.emit("death", new TriggerUnitEventDeath());
                    break;
                case "acquiredTarget":
                    unit.emit("acquiredTarget", new TriggerUnitEventAcquiredTarget());
                    break;
                case "attacked":
                    unit.emit("attacked", new TriggerUnitEventAttacked());
                    break;
                case "constructFinish":
                    unit.emit("constructFinish", new TriggerUnitEventConstructFinish());
                    break;
                case "detected":
                    unit.emit("detected", new TriggerUnitEventDetected());
                    break;
                case "stateLimit":
                    unit.emit("stateLimit", new TriggerUnitEventStateLimit());
                    break;
                case "targetInRange":
                    unit.emit('targetInRange', new TriggerUnitEventTargetInRange());
                    break;
                case "rescued":
                    unit.emit('rescued', new TriggerUnitEventRescued);
                    break;
                case "trainStart":
                    unit.emit("trainStart", new TriggerUnitEventTrainStart());
                    break;
                case "trainCancel":
                    unit.emit("trainCancel", new TriggerUnitEventTrainCancel())
                    break;
                case "trainFinish":
                    unit.emit("trainFinish", new TriggerUnitEventTrainFinish())
                    break;
                case "researchStart":
                    unit.emit("researchStart", new TriggerUnitEventResearchStart())
                    break;
                case "researchCancel":
                    unit.emit("researchCancel", new TriggerUnitEventResearchCancel())
                    break;
                case "researchFinish":
                    unit.emit("researchFinish", new TriggerUnitEventResearchFinish())
                    break;
                case "issuedOrder":
                    unit.emit("issuedOrder", new TriggerUnitEventIssuedOrder())
                    break;
                case "issuedPointOrder":
                    unit.emit("issuedPointOrder", new TriggerUnitEventIssuedPointOrder())
                    break;
                case "issuedTargetOrder":
                    unit.emit("issuedTargetOrder", new TriggerUnitEventIssuedTargetOrder())
                    break;
                case "heroSkill":
                    unit.emit("heroSkill", new TriggerUnitEvenHeroSkill())
                    break;
                case "heroRevivable":
                    unit.emit("heroRevivable", new TriggerUnitEventHeroRevivable())
                    break;
                case "heroReviveStart":
                    unit.emit("heroReviveStart", new TriggerUnitEventHeroReviveStart())
                    break;
                case "heroReviveCancel":
                    unit.emit("heroReviveCancel", new TriggerUnitEventHeroReviveCancel())
                    break;
                case "heroReviveFinish":
                    unit.emit("heroReviveFinish", new TriggerUnitEventHeroReviveFinish())
                    break;
                case "summon":
                    unit.emit("summon", new TriggerUnitEventSummon())
                    break;
                case "dropItem":
                    unit.emit("dropItem", new TriggerUnitEventDropItem())
                    break;
                case "pickupItem":
                    unit.emit("pickupItem", new TriggerUnitEventPickupItem())
                    break;
                case "useItem":
                    unit.emit("useItem", new TriggerUnitEventUseItem())
                    break;
                case "loaded":
                    unit.emit("loaded", new TriggerUnitEventLoaded())
                    break;
                default:
                    throw new TypeError(`Unexpected eventType: ${eventType}`);
            }
        });

        registerUnitEvents[eventType] = newTrigger;
        this.unitToTriggerMap.set(unit, registerUnitEvents);
    }

    public unsubscribe(eventType: string, unit: Unit): void {
        let registerUnitEvents = this.unitToTriggerMap.get(unit);
        if (!registerUnitEvents) return;

        const trigger = registerUnitEvents[eventType];
        if (!trigger) return;

        DestroyTrigger(trigger);
        delete registerUnitEvents[eventType];

        this.unitToTriggerMap.set(unit, registerUnitEvents);
    }
}

export const unitEmiter = new UnitEmiter();
