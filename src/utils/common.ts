import { getNativeByName } from "../unsafe.js";

export type UnitEvent = HandleHolder<"unitevent">;
export type Trigger = HandleHolder<"trigger">;
export type TriggerAction = HandleHolder<"triggeraction">;
export type Event = HandleHolder<"event">;

export type Code = () => number | void;


const ConvertUnitEvent = getNativeByName<UnitEvent, [number]>("ConvertUnitEvent", false, true);

export const CreateTrigger = getNativeByName<Trigger, []>("CreateTrigger", false, true);
export const GetTriggeringTrigger = getNativeByName<Trigger, []>("GetTriggeringTrigger", false, true);

export const DestroyTrigger = getNativeByName<void, [Trigger]>("DestroyTrigger", false, true);
export const ResetTrigger = getNativeByName<void, [Trigger]>("ResetTrigger", false, true);
export const EnableTrigger = getNativeByName<void, [Trigger]>("EnableTrigger", false, true);
export const DisableTrigger = getNativeByName<void, [Trigger]>("DisableTrigger", false, true);
export const IsTriggerEnabled = getNativeByName<boolean, []>("IsTriggerEnabled", false, true);

export const TriggerRegisterUnitEvent = getNativeByName<Event, [Trigger, HandleHolder<"unit">, UnitEvent]>("TriggerRegisterUnitEvent", false, true);
export const TriggerAddAction = getNativeByName<TriggerAction, [Trigger, Code]>("TriggerAddAction", false, true);




export const UnitEvents = {
    EVENT_UNIT_DAMAGED: ConvertUnitEvent(52),
    EVENT_UNIT_DAMAGING: ConvertUnitEvent(314),
    EVENT_UNIT_DEATH: ConvertUnitEvent(53),
    EVENT_UNIT_DECAY: ConvertUnitEvent(54),
    EVENT_UNIT_DETECTED: ConvertUnitEvent(55),
    EVENT_UNIT_HIDDEN: ConvertUnitEvent(56),
    EVENT_UNIT_SELECTED: ConvertUnitEvent(57),
    EVENT_UNIT_DESELECTED: ConvertUnitEvent(58),
    EVENT_UNIT_STATE_LIMIT: ConvertUnitEvent(59),
    EVENT_UNIT_ACQUIRED_TARGET: ConvertUnitEvent(60),
    EVENT_UNIT_TARGET_IN_RANGE: ConvertUnitEvent(61),
    EVENT_UNIT_ATTACKED: ConvertUnitEvent(62),
    EVENT_UNIT_RESCUED: ConvertUnitEvent(63),
    EVENT_UNIT_CONSTRUCT_CANCEL: ConvertUnitEvent(64),
    EVENT_UNIT_CONSTRUCT_FINISH: ConvertUnitEvent(65),
    EVENT_UNIT_UPGRADE_START: ConvertUnitEvent(66),
    EVENT_UNIT_UPGRADE_CANCEL: ConvertUnitEvent(67),
    EVENT_UNIT_UPGRADE_FINISH: ConvertUnitEvent(68),
    EVENT_UNIT_TRAIN_START: ConvertUnitEvent(69),
    EVENT_UNIT_TRAIN_CANCEL: ConvertUnitEvent(70),
    EVENT_UNIT_TRAIN_FINISH: ConvertUnitEvent(71),
    EVENT_UNIT_RESEARCH_START: ConvertUnitEvent(72),
    EVENT_UNIT_RESEARCH_CANCEL: ConvertUnitEvent(73),
    EVENT_UNIT_RESEARCH_FINISH: ConvertUnitEvent(74),
    EVENT_UNIT_ISSUED_ORDER: ConvertUnitEvent(75),
    EVENT_UNIT_ISSUED_POINT_ORDER: ConvertUnitEvent(76),
    EVENT_UNIT_ISSUED_TARGET_ORDER: ConvertUnitEvent(77),
    EVENT_UNIT_HERO_LEVEL: ConvertUnitEvent(78),
    EVENT_UNIT_HERO_SKILL: ConvertUnitEvent(79),
    EVENT_UNIT_HERO_REVIVABLE: ConvertUnitEvent(80),
    EVENT_UNIT_HERO_REVIVE_START: ConvertUnitEvent(81),
    EVENT_UNIT_HERO_REVIVE_CANCEL: ConvertUnitEvent(82),
    EVENT_UNIT_HERO_REVIVE_FINISH: ConvertUnitEvent(83),
    EVENT_UNIT_SUMMON: ConvertUnitEvent(84),
    EVENT_UNIT_DROP_ITEM: ConvertUnitEvent(85),
    EVENT_UNIT_PICKUP_ITEM: ConvertUnitEvent(86),
    EVENT_UNIT_USE_ITEM: ConvertUnitEvent(87),
    EVENT_UNIT_LOADED: ConvertUnitEvent(88),
    EVENT_UNIT_ATTACK_FINISHED: ConvertUnitEvent(316),
    EVENT_UNIT_DECAY_FINISHED: ConvertUnitEvent(318),
};

