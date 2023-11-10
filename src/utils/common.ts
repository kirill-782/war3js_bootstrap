import { getNativeByName, getGlobal } from "@war3js/unsafe";
import { Unit } from "../handles/Unit.js";
import { Player } from "../handles/Player.js";
import { Widget } from "../handles/Widget.js";
import { Destructable } from "../handles/Destructable.js";
import { Item } from "../handles/Item.js";

export type UnitEvent = HandleHolder<"unitevent">;
export type Trigger = HandleHolder<"trigger">;
export type TriggerAction = HandleHolder<"triggeraction">;
export type Event = HandleHolder<"event">;
export type UnitState = HandleHolder<"unitstate">;
export type Location = HandleHolder<"location">;

export type Code = () => number | void;

export const CreateTrigger = getNativeByName<Trigger, []>("CreateTrigger", false, true);
export const GetTriggeringTrigger = getNativeByName<Trigger, []>("GetTriggeringTrigger", false, true);

export const DestroyTrigger = getNativeByName<void, [Trigger]>("DestroyTrigger", false, true);
export const ResetTrigger = getNativeByName<void, [Trigger]>("ResetTrigger", false, true);
export const EnableTrigger = getNativeByName<void, [Trigger]>("EnableTrigger", false, true);
export const DisableTrigger = getNativeByName<void, [Trigger]>("DisableTrigger", false, true);
export const IsTriggerEnabled = getNativeByName<boolean, []>("IsTriggerEnabled", false, true);

export const GetTriggerUnit = getNativeByName<Unit, []>("GetTriggerUnit");
export const GetEventDamage = getNativeByName<number, []>("GetEventDamage");
export const GetEventDamageSource = getNativeByName<Unit, []>("GetEventDamageSource");
export const GetKillingUnit = getNativeByName<Unit, []>("GetKillingUnit");
export const GetEventDetectingPlayer = getNativeByName<Player, []>("GetEventDetectingPlayer");
export const GetEventUnitState = getNativeByName<UnitState, []>("GetEventUnitState");
export const GetEventTargetUnit = getNativeByName<Unit, []>("GetEventTargetUnit");
export const GetAttacker = getNativeByName<Unit, []>("GetAttacker");
export const GetRescuer = getNativeByName<Unit, []>("GetRescuer");
export const GetConstructedStructure = getNativeByName<Unit, []>("GetConstructedStructure");
export const GetTrainedUnitType = getNativeByName<number, []>("GetTrainedUnitType");
export const GetTrainedUnit = getNativeByName<Unit, []>("GetTrainedUnit");
export const GetResearched = getNativeByName<number, []>("GetResearched");
export const GetIssuedOrderId = getNativeByName<number, []>("GetIssuedOrderId");
export const GetOrderPointX = getNativeByName<number, []>("GetOrderPointX");
export const GetOrderPointY = getNativeByName<number, []>("GetOrderPointY");
export const GetOrderPointLoc = getNativeByName<Location, []>("GetOrderPointLoc");
export const GetOrderTarget = getNativeByName<Widget, []>("GetOrderTarget");
export const GetOrderTargetDestructable = getNativeByName<Destructable, []>("GetOrderTargetDestructable");
export const GetOrderTargetItem = getNativeByName<Item, []>("GetOrderTargetItem");
export const GetOrderTargetUnit = getNativeByName<Unit, []>("GetOrderTargetUnit");
export const GetLearnedSkill = getNativeByName<number, []>("GetLearnedSkill");
export const GetLearnedSkillLevel = getNativeByName<number, []>("GetLearnedSkillLevel");
export const GetRevivableUnit = getNativeByName<Unit, []>("GetRevivableUnit");
export const GetRevivingUnit = getNativeByName<Unit, []>("GetRevivingUnit");
export const GetSummonedUnit = getNativeByName<Unit, []>("GetSummonedUnit");
export const GetManipulatedItem = getNativeByName<Item, []>("GetManipulatedItem");
export const GetTransportUnit = getNativeByName<Unit, []>("GetTransportUnit");

export const TriggerRegisterUnitEvent = getNativeByName<Event, [Trigger, HandleHolder<"unit">, UnitEvent]>(
    "TriggerRegisterUnitEvent",
    false,
    true
);
export const TriggerAddAction = getNativeByName<TriggerAction, [Trigger, Code]>("TriggerAddAction", false, true);

getGlobal<Record<string, UnitEvent>>("EVENT_UNIT_DAMAGED");

export const UnitEvents = {
    EVENT_UNIT_DAMAGED: getGlobal<Record<string, UnitEvent>>("EVENT_UNIT_DAMAGED"),
    EVENT_UNIT_DAMAGING: getGlobal<Record<string, UnitEvent>>("EVENT_UNIT_DAMAGING"),
    EVENT_UNIT_DEATH: getGlobal<Record<string, UnitEvent>>("EVENT_UNIT_DEATH"),
    EVENT_UNIT_DECAY: getGlobal<Record<string, UnitEvent>>("EVENT_UNIT_DECAY"),
    EVENT_UNIT_DETECTED: getGlobal<Record<string, UnitEvent>>("EVENT_UNIT_DETECTED"),
    EVENT_UNIT_HIDDEN: getGlobal<Record<string, UnitEvent>>("EVENT_UNIT_HIDDEN"),
    EVENT_UNIT_SELECTED: getGlobal<Record<string, UnitEvent>>("EVENT_UNIT_SELECTED"),
    EVENT_UNIT_DESELECTED: getGlobal<Record<string, UnitEvent>>("EVENT_UNIT_DESELECTED"),
    EVENT_UNIT_STATE_LIMIT: getGlobal<Record<string, UnitEvent>>("EVENT_UNIT_STATE_LIMIT"),
    EVENT_UNIT_ACQUIRED_TARGET: getGlobal<Record<string, UnitEvent>>("EVENT_UNIT_ACQUIRED_TARGET"),
    EVENT_UNIT_TARGET_IN_RANGE: getGlobal<Record<string, UnitEvent>>("EVENT_UNIT_TARGET_IN_RANGE"),
    EVENT_UNIT_ATTACKED: getGlobal<Record<string, UnitEvent>>("EVENT_UNIT_ATTACKED"),
    EVENT_UNIT_RESCUED: getGlobal<Record<string, UnitEvent>>("EVENT_UNIT_RESCUED"),
    EVENT_UNIT_CONSTRUCT_CANCEL: getGlobal<Record<string, UnitEvent>>("EVENT_UNIT_CONSTRUCT_CANCEL"),
    EVENT_UNIT_CONSTRUCT_FINISH: getGlobal<Record<string, UnitEvent>>("EVENT_UNIT_CONSTRUCT_FINISH"),
    EVENT_UNIT_UPGRADE_START: getGlobal<Record<string, UnitEvent>>("EVENT_UNIT_UPGRADE_START"),
    EVENT_UNIT_UPGRADE_CANCEL: getGlobal<Record<string, UnitEvent>>("EVENT_UNIT_UPGRADE_CANCEL"),
    EVENT_UNIT_UPGRADE_FINISH: getGlobal<Record<string, UnitEvent>>("EVENT_UNIT_UPGRADE_FINISH"),
    EVENT_UNIT_TRAIN_START: getGlobal<Record<string, UnitEvent>>("EVENT_UNIT_TRAIN_START"),
    EVENT_UNIT_TRAIN_CANCEL: getGlobal<Record<string, UnitEvent>>("EVENT_UNIT_TRAIN_CANCEL"),
    EVENT_UNIT_TRAIN_FINISH: getGlobal<Record<string, UnitEvent>>("EVENT_UNIT_TRAIN_FINISH"),
    EVENT_UNIT_RESEARCH_START: getGlobal<Record<string, UnitEvent>>("EVENT_UNIT_RESEARCH_START"),
    EVENT_UNIT_RESEARCH_CANCEL: getGlobal<Record<string, UnitEvent>>("EVENT_UNIT_RESEARCH_CANCEL"),
    EVENT_UNIT_RESEARCH_FINISH: getGlobal<Record<string, UnitEvent>>("EVENT_UNIT_RESEARCH_FINISH"),
    EVENT_UNIT_ISSUED_ORDER: getGlobal<Record<string, UnitEvent>>("EVENT_UNIT_ISSUED_ORDER"),
    EVENT_UNIT_ISSUED_POINT_ORDER: getGlobal<Record<string, UnitEvent>>("EVENT_UNIT_ISSUED_POINT_ORDER"),
    EVENT_UNIT_ISSUED_TARGET_ORDER: getGlobal<Record<string, UnitEvent>>("EVENT_UNIT_ISSUED_TARGET_ORDER"),
    EVENT_UNIT_HERO_LEVEL: getGlobal<Record<string, UnitEvent>>("EVENT_UNIT_HERO_LEVEL"),
    EVENT_UNIT_HERO_SKILL: getGlobal<Record<string, UnitEvent>>("EVENT_UNIT_HERO_SKILL"),
    EVENT_UNIT_HERO_REVIVABLE: getGlobal<Record<string, UnitEvent>>("EVENT_UNIT_HERO_REVIVABLE"),
    EVENT_UNIT_HERO_REVIVE_START: getGlobal<Record<string, UnitEvent>>("EVENT_UNIT_HERO_REVIVE_START"),
    EVENT_UNIT_HERO_REVIVE_CANCEL: getGlobal<Record<string, UnitEvent>>("EVENT_UNIT_HERO_REVIVE_CANCEL"),
    EVENT_UNIT_HERO_REVIVE_FINISH: getGlobal<Record<string, UnitEvent>>("EVENT_UNIT_HERO_REVIVE_FINISH"),
    EVENT_UNIT_SUMMON: getGlobal<Record<string, UnitEvent>>("EVENT_UNIT_SUMMON"),
    EVENT_UNIT_DROP_ITEM: getGlobal<Record<string, UnitEvent>>("EVENT_UNIT_DROP_ITEM"),
    EVENT_UNIT_PICKUP_ITEM: getGlobal<Record<string, UnitEvent>>("EVENT_UNIT_PICKUP_ITEM"),
    EVENT_UNIT_USE_ITEM: getGlobal<Record<string, UnitEvent>>("EVENT_UNIT_USE_ITEM"),
    EVENT_UNIT_LOADED: getGlobal<Record<string, UnitEvent>>("EVENT_UNIT_LOADED"),
    EVENT_UNIT_ATTACK_FINISHED: getGlobal<Record<string, UnitEvent>>("EVENT_UNIT_ATTACK_FINISHED"),
    EVENT_UNIT_DECAY_FINISHED: getGlobal<Record<string, UnitEvent>>("EVENT_UNIT_DECAY_FINISHED"),
};
