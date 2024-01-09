import { getNativeByName, getGlobal, HandleHolder } from "@war3js/unsafe";
import { Unit } from "../handles/Unit.js";
import { Player } from "../handles/Player.js";
import { Widget } from "../handles/Widget.js";
import { Destructable } from "../handles/Destructable.js";
import { Item } from "../handles/Item.js";

// Handle class types
export type HUnit = HandleHolder<"unit", Unit>;
export type HPlayer = HandleHolder<"player", Player>;
export type HWidget = HandleHolder<"widget", Widget>;
export type HDestructable = HandleHolder<"destructable", Destructable>;
export type HItem = HandleHolder<"item", Item>;

// Handle only types
export type HUnitEvent = HandleHolder<"unitevent">;
export type HPlayerUnitEvent = HandleHolder<"playerunitevent">;
export type HLimitOp = HandleHolder<"limitop">;
export type HTrigger = HandleHolder<"trigger">;
export type HTriggerAction = HandleHolder<"triggeraction">;
export type HEvent = HandleHolder<"event">;
export type HUnitState = HandleHolder<"unitstate">;
export type HLocation = HandleHolder<"location">;
export type HBuff = HandleHolder<"buff">;
export type HAbility = HandleHolder<"ability">;
export type HProjectile = HandleHolder<"projectile">;

export type JassCodeCallback = () => number | void;

export const CreateDestructableNe = getNativeByName<
    HandleHolder<"item">,
    [number, number, number, number, number, number]
>("CreateDestructable", false, true);

export const CreateItemNe = getNativeByName<HandleHolder<"item">, [number, number, number]>("CreateItem", false, true);

export const CreateTriggerNe = getNativeByName<HTrigger, []>("CreateTrigger", false, true);
export const GetTriggeringTriggerNe = getNativeByName<HTrigger, []>("GetTriggeringTrigger", false, true);

export const CreateTimerNe = getNativeByName<HandleHolder<"timer">, []>("CreateTimer", false, true);

export const CreateUnitNe = getNativeByName<
    HandleHolder<"unit">,
    [HandleHolder<"player">, number, number, number, number]
>("CreateUnit", false, true);

export const CreateAbilityNe = getNativeByName<HandleHolder<"ability">, [number]>("CreateAbility", false, true);

export const CreateCorpseNe = getNativeByName<
    HandleHolder<"unit">,
    [HandleHolder<"player">, number, number, number, number]
>("CreateCorpse", false, true);

export const CreateBuildingExNe = getNativeByName<
    HandleHolder<"unit">,
    [HandleHolder<"player">, number, number, number, number, boolean, boolean]
>("CreateBuildingEx", false, true);

export const CreateIllusionNe = getNativeByName<
    HandleHolder<"unit">,
    [HandleHolder<"player">, number, number, number, number]
>("CreateIllusion", false, true);

export const CreateIllusionFromUnitExNe = getNativeByName<HandleHolder<"unit">, [HandleHolder<"unit">, boolean]>(
    "CreateIllusionFromUnitEx",
    false,
    true,
);

export const DestroyTrigger = getNativeByName<void, [HTrigger]>("DestroyTrigger");
export const DestroyTimer = getNativeByName<void, [HTrigger]>("DestroyTimer");
export const ResetTrigger = getNativeByName<void, [HTrigger]>("ResetTrigger");
export const EnableTrigger = getNativeByName<void, [HTrigger]>("EnableTrigger");
export const DisableTrigger = getNativeByName<void, [HTrigger]>("DisableTrigger");
export const IsTriggerEnabled = getNativeByName<boolean, []>("IsTriggerEnabled");

export const TimerStart = getNativeByName<void, [HandleHolder<"timer">, number, boolean, JassCodeCallback]>(
    "TimerStart",
);

// eslint-disable-next-line bad-native-variable-name
export const PlayerNative = getNativeByName<HandleHolder<"player">, [number]>("Player");
export const GetLocalPlayer = getNativeByName<HandleHolder<"player">, []>("GetLocalPlayer");

// Insance API
// Ability

export const GetAbilityBaseRealFieldById = getNativeByName<number, [number, HandleHolder<"_enum">]>(
    "GetAbilityBaseRealFieldById",
);

export const GetAbilityBaseIntegerFieldById = getNativeByName<number, [number, HandleHolder<"_enum">]>(
    "GetAbilityBaseIntegerFieldById",
);

export const GetAbilityBaseBooleanFieldById = getNativeByName<boolean, [number, HandleHolder<"_enum">]>(
    "GetAbilityBaseBooleanFieldById",
);

export const GetAbilityBaseStringFieldById = getNativeByName<string, [number, HandleHolder<"_enum">]>(
    "GetAbilityBaseStringFieldById",
);

export const GetAbilityBaseRealLevelFieldById = getNativeByName<number, [number, HandleHolder<"_enum">, number]>(
    "GetAbilityBaseRealLevelFieldById",
);

export const GetAbilityBaseIntegerLevelFieldById = getNativeByName<number, [number, HandleHolder<"_enum">, number]>(
    "GetAbilityBaseIntegerLevelFieldById",
);

export const GetAbilityBaseBooleanLevelFieldById = getNativeByName<boolean, [number, HandleHolder<"_enum">, number]>(
    "GetAbilityBaseBooleanLevelFieldById",
);

export const GetAbilityBaseStringLevelFieldById = getNativeByName<string, [number, HandleHolder<"_enum">, number]>(
    "GetAbilityBaseStringLevelFieldById",
);

export const SetAbilityBaseBooleanFieldById = getNativeByName<boolean, [number, HandleHolder<"_enum">, boolean]>(
    "SetAbilityBaseBooleanFieldById",
);

export const SetAbilityBaseStringFieldById = getNativeByName<boolean, [number, HandleHolder<"_enum">, string]>(
    "SetAbilityBaseStringFieldById",
);

export const SetAbilityBaseRealFieldById = getNativeByName<boolean, [number, HandleHolder<"_enum">, number]>(
    "SetAbilityBaseRealFieldById",
);

export const SetAbilityBaseIntegerFieldById = getNativeByName<boolean, [number, HandleHolder<"_enum">, number]>(
    "SetAbilityBaseIntegerFieldById",
);

export const SetAbilityBaseRealLevelFieldById = getNativeByName<
    boolean,
    [number, HandleHolder<"_enum">, number, number]
>("SetAbilityBaseRealLevelFieldById");

export const SetAbilityBaseIntegerLevelFieldById = getNativeByName<
    boolean,
    [number, HandleHolder<"_enum">, number, number]
>("SetAbilityBaseIntegerLevelFieldById");

export const SetAbilityBaseBooleanLevelFieldById = getNativeByName<
    boolean,
    [number, HandleHolder<"_enum">, number, boolean]
>("SetAbilityBaseBooleanLevelFieldById");

export const SetAbilityBaseStringLevelFieldById = getNativeByName<
    boolean,
    [number, HandleHolder<"_enum">, number, string]
>("SetAbilityBaseStringLevelFieldById");

export const GetAbilityRealField = getNativeByName<number, [HandleHolder<"ability">, HandleHolder<"_enum">]>(
    "GetAbilityRealField",
);

export const GetAbilityIntegerField = getNativeByName<number, [HandleHolder<"ability">, HandleHolder<"_enum">]>(
    "GetAbilityIntegerField",
);

export const GetAbilityBooleanField = getNativeByName<boolean, [HandleHolder<"ability">, HandleHolder<"_enum">]>(
    "GetAbilityBooleanField",
);

export const GetAbilityStringField = getNativeByName<string, [HandleHolder<"ability">, HandleHolder<"_enum">]>(
    "GetAbilityStringField",
);

export const GetAbilityRealLevelField = getNativeByName<
    number,
    [HandleHolder<"ability">, HandleHolder<"_enum">, number]
>("GetAbilityRealLevelField");

export const GetAbilityIntegerLevelField = getNativeByName<
    number,
    [HandleHolder<"ability">, HandleHolder<"_enum">, number]
>("GetAbilityIntegerLevelField");

export const GetAbilityBooleanLevelField = getNativeByName<
    boolean,
    [HandleHolder<"ability">, HandleHolder<"_enum">, number]
>("GetAbilityBooleanLevelField");

export const GetAbilityStringLevelField = getNativeByName<
    string,
    [HandleHolder<"ability">, HandleHolder<"_enum">, number]
>("GetAbilityStringLevelField");

export const SetAbilityBooleanField = getNativeByName<
    boolean,
    [HandleHolder<"ability">, HandleHolder<"_enum">, boolean]
>("SetAbilityBooleanField");

export const SetAbilityStringField = getNativeByName<boolean, [HandleHolder<"ability">, HandleHolder<"_enum">, string]>(
    "SetAbilityStringField",
);

export const SetAbilityRealField = getNativeByName<boolean, [HandleHolder<"ability">, HandleHolder<"_enum">, number]>(
    "SetAbilityRealField",
);

export const SetAbilityIntegerField = getNativeByName<
    boolean,
    [HandleHolder<"ability">, HandleHolder<"_enum">, number]
>("SetAbilityIntegerField");

export const SetAbilityRealLevelField = getNativeByName<
    boolean,
    [HandleHolder<"ability">, HandleHolder<"_enum">, number, number]
>("SetAbilityRealLevelField");

export const SetAbilityIntegerLevelField = getNativeByName<
    boolean,
    [HandleHolder<"ability">, HandleHolder<"_enum">, number, number]
>("SetAbilityIntegerLevelField");

export const SetAbilityBooleanLevelField = getNativeByName<
    boolean,
    [HandleHolder<"ability">, HandleHolder<"_enum">, number, boolean]
>("SetAbilityBooleanLevelField");

export const SetAbilityStringLevelField = getNativeByName<
    boolean,
    [HandleHolder<"ability">, HandleHolder<"_enum">, number, string]
>("SetAbilityStringLevelField");

// Unit

export const GetUnitBaseIntegerFieldById = getNativeByName<number, [number, HandleHolder<"_enum">]>(
    "GetUnitBaseIntegerFieldById",
);

export const GetUnitBaseBooleanFieldById = getNativeByName<boolean, [number, HandleHolder<"_enum">]>(
    "GetUnitBaseBooleanFieldById",
);

export const GetUnitBaseRealFieldById = getNativeByName<number, [number, HandleHolder<"_enum">]>(
    "GetUnitBaseRealFieldById",
);
export const GetUnitBaseStringFieldById = getNativeByName<string, [number, HandleHolder<"_enum">]>(
    "GetUnitBaseStringFieldById",
);
export const GetUnitBaseWeaponIntegerFieldById = getNativeByName<number, [number, HandleHolder<"_enum">, number]>(
    "GetUnitBaseWeaponIntegerFieldById",
);
export const GetUnitBaseWeaponBooleanFieldById = getNativeByName<boolean, [number, HandleHolder<"_enum">, number]>(
    "GetUnitBaseWeaponBooleanFieldById",
);
export const GetUnitBaseWeaponRealFieldById = getNativeByName<number, [number, HandleHolder<"_enum">, number]>(
    "GetUnitBaseWeaponRealFieldById",
);
export const GetUnitBaseWeaponStringFieldById = getNativeByName<string, [number, HandleHolder<"_enum">, number]>(
    "GetUnitBaseWeaponStringFieldById",
);
export const SetUnitBaseIntegerFieldById = getNativeByName<boolean, [number, HandleHolder<"_enum">, number]>(
    "SetUnitBaseIntegerFieldById",
);
export const SetUnitBaseBooleanFieldById = getNativeByName<boolean, [number, HandleHolder<"_enum">, boolean]>(
    "SetUnitBaseBooleanFieldById",
);
export const SetUnitBaseRealFieldById = getNativeByName<boolean, [number, HandleHolder<"_enum">, number]>(
    "SetUnitBaseRealFieldById",
);
export const SetUnitBaseStringFieldById = getNativeByName<boolean, [number, HandleHolder<"_enum">, string]>(
    "SetUnitBaseStringFieldById",
);
export const SetUnitBaseWeaponIntegerFieldById = getNativeByName<
    boolean,
    [number, HandleHolder<"_enum">, number, number]
>("SetUnitBaseWeaponIntegerFieldById");
export const SetUnitBaseWeaponBooleanFieldById = getNativeByName<
    boolean,
    [number, HandleHolder<"_enum">, number, boolean]
>("SetUnitBaseWeaponBooleanFieldById");
export const SetUnitBaseWeaponRealFieldById = getNativeByName<boolean, [number, HandleHolder<"_enum">, number, number]>(
    "SetUnitBaseWeaponRealFieldById",
);
export const SetUnitBaseWeaponStringFieldById = getNativeByName<
    boolean,
    [number, HandleHolder<"_enum">, number, string]
>("SetUnitBaseWeaponStringFieldById");
export const GetUnitIntegerField = getNativeByName<number, [HandleHolder<"unit">, HandleHolder<"_enum">]>(
    "GetUnitIntegerField",
);
export const GetUnitBooleanField = getNativeByName<boolean, [HandleHolder<"unit">, HandleHolder<"_enum">]>(
    "GetUnitBooleanField",
);
export const GetUnitRealField = getNativeByName<number, [HandleHolder<"unit">, HandleHolder<"_enum">]>(
    "GetUnitRealField",
);
export const GetUnitStringField = getNativeByName<string, [HandleHolder<"unit">, HandleHolder<"_enum">]>(
    "GetUnitStringField",
);
export const GetUnitWeaponIntegerField = getNativeByName<number, [HandleHolder<"unit">, HandleHolder<"_enum">, number]>(
    "GetUnitWeaponIntegerField",
);
export const GetUnitWeaponBooleanField = getNativeByName<
    boolean,
    [HandleHolder<"unit">, HandleHolder<"_enum">, number]
>("GetUnitWeaponBooleanField");
export const GetUnitWeaponRealField = getNativeByName<number, [HandleHolder<"unit">, HandleHolder<"_enum">, number]>(
    "GetUnitWeaponRealField",
);
export const GetUnitWeaponStringField = getNativeByName<string, [HandleHolder<"unit">, HandleHolder<"_enum">, number]>(
    "GetUnitWeaponStringField",
);

// Item

export const GetBaseItemIntegerFieldById = getNativeByName<number, [number, HandleHolder<"_enum">]>(
    "GetBaseItemIntegerFieldById",
);
export const GetBaseItemBooleanFieldById = getNativeByName<boolean, [number, HandleHolder<"_enum">]>(
    "GetBaseItemBooleanFieldById",
);
export const GetBaseItemRealFieldById = getNativeByName<number, [number, HandleHolder<"_enum">]>(
    "GetBaseItemRealFieldById",
);
export const GetBaseItemStringFieldById = getNativeByName<string, [number, HandleHolder<"_enum">]>(
    "GetBaseItemStringFieldById",
);
export const SetBaseItemIntegerFieldById = getNativeByName<boolean, [number, HandleHolder<"_enum">, number]>(
    "SetBaseItemIntegerFieldById",
);
export const SetBaseItemBooleanFieldById = getNativeByName<boolean, [number, HandleHolder<"_enum">, boolean]>(
    "SetBaseItemBooleanFieldById",
);
export const SetBaseItemRealFieldById = getNativeByName<boolean, [number, HandleHolder<"_enum">, number]>(
    "SetBaseItemRealFieldById",
);
export const SetBaseItemStringFieldById = getNativeByName<boolean, [number, HandleHolder<"_enum">, string]>(
    "SetBaseItemStringFieldById",
);
export const GetItemIntegerField = getNativeByName<number, [HandleHolder<"item">, HandleHolder<"_enum">]>(
    "GetItemIntegerField",
);
export const GetItemBooleanField = getNativeByName<boolean, [HandleHolder<"item">, HandleHolder<"_enum">]>(
    "GetItemBooleanField",
);
export const GetItemRealField = getNativeByName<number, [HandleHolder<"item">, HandleHolder<"_enum">]>(
    "GetItemRealField",
);
export const GetItemStringField = getNativeByName<string, [HandleHolder<"item">, HandleHolder<"_enum">]>(
    "GetItemStringField",
);
export const SetItemIntegerField = getNativeByName<boolean, [HandleHolder<"item">, HandleHolder<"_enum">, number]>(
    "SetItemIntegerField",
);
export const SetItemBooleanField = getNativeByName<boolean, [HandleHolder<"item">, HandleHolder<"_enum">, boolean]>(
    "SetItemBooleanField",
);
export const SetItemRealField = getNativeByName<boolean, [HandleHolder<"item">, HandleHolder<"_enum">, number]>(
    "SetItemRealField",
);
export const SetItemStringField = getNativeByName<boolean, [HandleHolder<"item">, HandleHolder<"_enum">, string]>(
    "SetItemStringField",
);

// Destructable

export const GetDestructableStringField = getNativeByName<
    string,
    [HandleHolder<"destructable">, HandleHolder<"_enum">]
>("GetDestructableStringField");
export const SetDestructableStringField = getNativeByName<
    boolean,
    [HandleHolder<"destructable">, HandleHolder<"_enum">, string]
>("SetDestructableStringField");

// Trigger event API

export const GetTriggerUnit = getNativeByName<HUnit, []>("GetTriggerUnit");
export const GetEventDamage = getNativeByName<number, []>("GetEventDamage");
export const GetEventDamageSource = getNativeByName<HUnit, []>("GetEventDamageSource");
export const GetKillingUnit = getNativeByName<HUnit, []>("GetKillingUnit");
export const GetEventDetectingPlayer = getNativeByName<HPlayer, []>("GetEventDetectingPlayer");
export const GetEventUnitState = getNativeByName<HUnitState, []>("GetEventUnitState");
export const GetEventTargetUnit = getNativeByName<HUnit, []>("GetEventTargetUnit");
export const GetAttacker = getNativeByName<HUnit, []>("GetAttacker");
export const GetRescuer = getNativeByName<HUnit, []>("GetRescuer");
export const GetConstructedStructure = getNativeByName<HUnit, []>("GetConstructedStructure");
export const GetTrainedUnitType = getNativeByName<number, []>("GetTrainedUnitType");
export const GetTrainedUnit = getNativeByName<HUnit, []>("GetTrainedUnit");
export const GetResearched = getNativeByName<number, []>("GetResearched");
export const GetIssuedOrderId = getNativeByName<number, []>("GetIssuedOrderId");
export const GetOrderPointX = getNativeByName<number, []>("GetOrderPointX");
export const GetOrderPointY = getNativeByName<number, []>("GetOrderPointY");
export const GetOrderPointLoc = getNativeByName<HLocation, []>("GetOrderPointLoc");
export const GetOrderTarget = getNativeByName<HWidget, []>("GetOrderTarget");
export const GetOrderTargetDestructable = getNativeByName<HDestructable, []>("GetOrderTargetDestructable");
export const GetOrderTargetItem = getNativeByName<HItem, []>("GetOrderTargetItem");
export const GetOrderTargetUnit = getNativeByName<HUnit, []>("GetOrderTargetUnit");
export const GetLearnedSkill = getNativeByName<number, []>("GetLearnedSkill");
export const GetLearnedSkillLevel = getNativeByName<number, []>("GetLearnedSkillLevel");
export const GetRevivableUnit = getNativeByName<HUnit, []>("GetRevivableUnit");
export const GetRevivingUnit = getNativeByName<HUnit, []>("GetRevivingUnit");
export const GetSummonedUnit = getNativeByName<HUnit, []>("GetSummonedUnit");
export const GetManipulatedItem = getNativeByName<HItem, []>("GetManipulatedItem");
export const GetTransportUnit = getNativeByName<HUnit, []>("GetTransportUnit");
export const GetTriggerBuff = getNativeByName<HBuff, []>("GetTriggerBuff");
export const GetTriggerBuffSourceAbility = getNativeByName<HAbility, []>("GetTriggerBuffSourceAbility");
export const GetTriggerBuffSourceUnit = getNativeByName<HUnit, []>("GetTriggerBuffSourceUnit");
export const GetTriggerBuffTarget = getNativeByName<HUnit, []>("GetTriggerBuffTarget");
export const GetTriggerProjectileTarget = getNativeByName<HWidget, []>("GetTriggerProjectileTarget");
export const GetTriggerProjectileSource = getNativeByName<HUnit, []>("GetTriggerProjectileSource");
export const GetTriggerProjectile = getNativeByName<HProjectile, []>("GetTriggerProjectile");
export const GetSpellAbilityId = getNativeByName<number, []>("GetSpellAbilityId");
export const GetSpellAbility = getNativeByName<HAbility, []>("GetSpellAbility");
export const GetSpellTargetX = getNativeByName<number, []>("GetSpellTargetX");
export const GetSpellTargetY = getNativeByName<number, []>("GetSpellTargetY");
export const GetSpellTargetDestructable = getNativeByName<HDestructable, []>("GetSpellTargetDestructable");
export const GetSpellTargetItem = getNativeByName<HItem, []>("GetSpellTargetItem");
export const GetSpellTargetUnit = getNativeByName<HUnit, []>("GetSpellTargetUnit");

// Trigger API

export const TriggerRegisterUnitEventNe = getNativeByName<HEvent, [HTrigger, HandleHolder<"unit">, HUnitEvent]>(
    "TriggerRegisterUnitEvent",
    false,
    true,
);

export const TriggerRegisterPlayerUnitEventNe = getNativeByName<
    HEvent,
    [HTrigger, HandleHolder<"player">, HPlayerUnitEvent]
>("TriggerRegisterPlayerUnitEvent", false, true);

export const TriggerRegisterUnitStateEventNe = getNativeByName<
    HEvent,
    [HTrigger, HandleHolder<"unit">, HUnitState, HLimitOp, number]
>("TriggerRegisterUnitStateEvent", false, true);

export const TriggerAddActionNe = getNativeByName<HTriggerAction, [HTrigger, JassCodeCallback]>(
    "TriggerAddAction",
    false,
    true,
);

export const ABILITY_IF_LEVELS = getGlobal<Record<string, HandleHolder<"_enum">>>("ABILITY_IF_LEVELS");

export const UnitStates = {
    UNIT_STATE_LIFE: getGlobal<Record<string, HUnitState>>("UNIT_STATE_LIFE"),
    UNIT_STATE_MAX_LIFE: getGlobal<Record<string, HUnitState>>("UNIT_STATE_MAX_LIFE"),
    UNIT_STATE_MANA: getGlobal<Record<string, HUnitState>>("UNIT_STATE_MANA"),
    UNIT_STATE_MAX_MANA: getGlobal<Record<string, HUnitState>>("UNIT_STATE_MAX_MANA"),
};

export const LimitOps = {
    LESS_THAN: getGlobal<Record<string, HLimitOp>>("LESS_THAN"),
    LESS_THAN_OR_EQUAL: getGlobal<Record<string, HLimitOp>>("LESS_THAN_OR_EQUAL"),
    EQUAL: getGlobal<Record<string, HLimitOp>>("EQUAL"),
    GREATER_THAN_OR_EQUAL: getGlobal<Record<string, HLimitOp>>("GREATER_THAN_OR_EQUAL"),
    GREATER_THAN: getGlobal<Record<string, HLimitOp>>("GREATER_THAN"),
    NOT_EQUAL: getGlobal<Record<string, HLimitOp>>("NOT_EQUAL"),
};

export const UnitEvents = {
    EVENT_UNIT_DAMAGED: getGlobal<Record<string, HUnitEvent>>("EVENT_UNIT_DAMAGED"),
    EVENT_UNIT_DAMAGING: getGlobal<Record<string, HUnitEvent>>("EVENT_UNIT_DAMAGING"),
    EVENT_UNIT_DEATH: getGlobal<Record<string, HUnitEvent>>("EVENT_UNIT_DEATH"),
    EVENT_UNIT_DECAY: getGlobal<Record<string, HUnitEvent>>("EVENT_UNIT_DECAY"),
    EVENT_UNIT_DETECTED: getGlobal<Record<string, HUnitEvent>>("EVENT_UNIT_DETECTED"),
    EVENT_UNIT_HIDDEN: getGlobal<Record<string, HUnitEvent>>("EVENT_UNIT_HIDDEN"),
    EVENT_UNIT_SELECTED: getGlobal<Record<string, HUnitEvent>>("EVENT_UNIT_SELECTED"),
    EVENT_UNIT_DESELECTED: getGlobal<Record<string, HUnitEvent>>("EVENT_UNIT_DESELECTED"),
    EVENT_UNIT_STATE_LIMIT: getGlobal<Record<string, HUnitEvent>>("EVENT_UNIT_STATE_LIMIT"),
    EVENT_UNIT_ACQUIRED_TARGET: getGlobal<Record<string, HUnitEvent>>("EVENT_UNIT_ACQUIRED_TARGET"),
    EVENT_UNIT_TARGET_IN_RANGE: getGlobal<Record<string, HUnitEvent>>("EVENT_UNIT_TARGET_IN_RANGE"),
    EVENT_UNIT_ATTACKED: getGlobal<Record<string, HUnitEvent>>("EVENT_UNIT_ATTACKED"),
    EVENT_UNIT_RESCUED: getGlobal<Record<string, HUnitEvent>>("EVENT_UNIT_RESCUED"),
    EVENT_UNIT_CONSTRUCT_CANCEL: getGlobal<Record<string, HUnitEvent>>("EVENT_UNIT_CONSTRUCT_CANCEL"),
    EVENT_UNIT_CONSTRUCT_FINISH: getGlobal<Record<string, HUnitEvent>>("EVENT_UNIT_CONSTRUCT_FINISH"),
    EVENT_UNIT_UPGRADE_START: getGlobal<Record<string, HUnitEvent>>("EVENT_UNIT_UPGRADE_START"),
    EVENT_UNIT_UPGRADE_CANCEL: getGlobal<Record<string, HUnitEvent>>("EVENT_UNIT_UPGRADE_CANCEL"),
    EVENT_UNIT_UPGRADE_FINISH: getGlobal<Record<string, HUnitEvent>>("EVENT_UNIT_UPGRADE_FINISH"),
    EVENT_UNIT_TRAIN_START: getGlobal<Record<string, HUnitEvent>>("EVENT_UNIT_TRAIN_START"),
    EVENT_UNIT_TRAIN_CANCEL: getGlobal<Record<string, HUnitEvent>>("EVENT_UNIT_TRAIN_CANCEL"),
    EVENT_UNIT_TRAIN_FINISH: getGlobal<Record<string, HUnitEvent>>("EVENT_UNIT_TRAIN_FINISH"),
    EVENT_UNIT_RESEARCH_START: getGlobal<Record<string, HUnitEvent>>("EVENT_UNIT_RESEARCH_START"),
    EVENT_UNIT_RESEARCH_CANCEL: getGlobal<Record<string, HUnitEvent>>("EVENT_UNIT_RESEARCH_CANCEL"),
    EVENT_UNIT_RESEARCH_FINISH: getGlobal<Record<string, HUnitEvent>>("EVENT_UNIT_RESEARCH_FINISH"),
    EVENT_UNIT_ISSUED_ORDER: getGlobal<Record<string, HUnitEvent>>("EVENT_UNIT_ISSUED_ORDER"),
    EVENT_UNIT_ISSUED_POINT_ORDER: getGlobal<Record<string, HUnitEvent>>("EVENT_UNIT_ISSUED_POINT_ORDER"),
    EVENT_UNIT_ISSUED_TARGET_ORDER: getGlobal<Record<string, HUnitEvent>>("EVENT_UNIT_ISSUED_TARGET_ORDER"),
    EVENT_UNIT_HERO_LEVEL: getGlobal<Record<string, HUnitEvent>>("EVENT_UNIT_HERO_LEVEL"),
    EVENT_UNIT_HERO_SKILL: getGlobal<Record<string, HUnitEvent>>("EVENT_UNIT_HERO_SKILL"),
    EVENT_UNIT_HERO_REVIVABLE: getGlobal<Record<string, HUnitEvent>>("EVENT_UNIT_HERO_REVIVABLE"),
    EVENT_UNIT_HERO_REVIVE_START: getGlobal<Record<string, HUnitEvent>>("EVENT_UNIT_HERO_REVIVE_START"),
    EVENT_UNIT_HERO_REVIVE_CANCEL: getGlobal<Record<string, HUnitEvent>>("EVENT_UNIT_HERO_REVIVE_CANCEL"),
    EVENT_UNIT_HERO_REVIVE_FINISH: getGlobal<Record<string, HUnitEvent>>("EVENT_UNIT_HERO_REVIVE_FINISH"),
    EVENT_UNIT_SUMMON: getGlobal<Record<string, HUnitEvent>>("EVENT_UNIT_SUMMON"),
    EVENT_UNIT_DROP_ITEM: getGlobal<Record<string, HUnitEvent>>("EVENT_UNIT_DROP_ITEM"),
    EVENT_UNIT_PICKUP_ITEM: getGlobal<Record<string, HUnitEvent>>("EVENT_UNIT_PICKUP_ITEM"),
    EVENT_UNIT_USE_ITEM: getGlobal<Record<string, HUnitEvent>>("EVENT_UNIT_USE_ITEM"),
    EVENT_UNIT_LOADED: getGlobal<Record<string, HUnitEvent>>("EVENT_UNIT_LOADED"),
    EVENT_UNIT_ATTACK_FINISHED: getGlobal<Record<string, HUnitEvent>>("EVENT_UNIT_ATTACK_FINISHED"),
    EVENT_UNIT_DECAY_FINISHED: getGlobal<Record<string, HUnitEvent>>("EVENT_UNIT_DECAY_FINISHED"),
    EVENT_UNIT_BUFF_RECEIVED: getGlobal<Record<string, HUnitEvent>>("EVENT_UNIT_BUFF_RECEIVED"),
    EVENT_UNIT_BUFF_REFRESHED: getGlobal<Record<string, HUnitEvent>>("EVENT_UNIT_BUFF_REFRESHED"),
    EVENT_UNIT_BUFF_ENDED: getGlobal<Record<string, HUnitEvent>>("EVENT_UNIT_BUFF_ENDED"),
    EVENT_UNIT_PROJECTILE_LAUNCH: getGlobal<Record<string, HUnitEvent>>("EVENT_UNIT_PROJECTILE_LAUNCH"),
    EVENT_UNIT_PROJECTILE_HIT: getGlobal<Record<string, HUnitEvent>>("EVENT_UNIT_PROJECTILE_HIT"),
    EVENT_UNIT_ABILITY_ADDED: getGlobal<Record<string, HUnitEvent>>("EVENT_UNIT_ABILITY_ADDED"),
    EVENT_UNIT_ABILITY_REMOVED: getGlobal<Record<string, HUnitEvent>>("EVENT_UNIT_ABILITY_REMOVED"),
    EVENT_UNIT_ABILITY_AUTOCAST_ON: getGlobal<Record<string, HUnitEvent>>("EVENT_UNIT_ABILITY_AUTOCAST_ON"),
    EVENT_UNIT_ABILITY_AUTOCAST_OFF: getGlobal<Record<string, HUnitEvent>>("EVENT_UNIT_ABILITY_AUTOCAST_OFF"),
    EVENT_UNIT_SPELL_CHANNEL: getGlobal<Record<string, HUnitEvent>>("EVENT_UNIT_SPELL_CHANNEL"),
    EVENT_UNIT_SPELL_CAST: getGlobal<Record<string, HUnitEvent>>("EVENT_UNIT_SPELL_CAST"),
    EVENT_UNIT_SPELL_EFFECT: getGlobal<Record<string, HUnitEvent>>("EVENT_UNIT_SPELL_EFFECT"),
    EVENT_UNIT_SPELL_FINISH: getGlobal<Record<string, HUnitEvent>>("EVENT_UNIT_SPELL_FINISH"),
    EVENT_UNIT_SPELL_ENDCAST: getGlobal<Record<string, HUnitEvent>>("EVENT_UNIT_SPELL_ENDCAST"),
};
