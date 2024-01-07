import { EventMap, EventEmitter } from '@war3js/events';
export { TextDecoder, TextEncoder } from 'text-decoding';
import { Headers } from '@war3js/headers-polyfill';
export { Headers } from '@war3js/headers-polyfill';

declare class Console {
    trace(...args: any): void;
    debug(...args: any): void;
    info(...args: any): void;
    warn(...args: any): void;
    error(...args: any): void;
    log(...args: any): void;
}

type HandleConstructor<T extends string = string, H extends Handle = Handle> = new (handle: HandleHolder<T>) => H;
interface HandleEventMap extends EventMap {
    error: (error: Error) => void;
    remove: () => void;
}
declare class Handle<T extends HandleEventMap = HandleEventMap> extends EventEmitter<T> {
    #private;
    constructor(handleHolder: Handle | HandleHolder<string>);
    get handle(): HandleHolder<string, unknown>;
    equals(anotherHandle: Handle): boolean;
}

interface Ability {
    get handle(): HandleHolder<"ability">;
}
declare class Ability<T extends HandleEventMap = HandleEventMap> extends Handle<T> {
    constructor(itemHandle: HandleHolder<"ability">);
    constructor(itemHandle: Ability);
    constructor(abilCode: number);
}

interface AbilityLevelAccessorNatives<T> {
    get: (ability: HandleHolder<"ability">, field: HandleHolder<"_enum">, level: number) => T;
    set: (ability: HandleHolder<"ability">, field: HandleHolder<"_enum">, level: number, value: T) => boolean;
    baseGet: (abilId: number, field: HandleHolder<"_enum">, level: number) => T;
    baseSet: (ability: number, field: HandleHolder<"_enum">, level: number, value: T) => boolean;
}
declare class AbilityLevelAccessor<T> implements Iterable<T> {
    #private;
    constructor(abilityData: AbilityData, field: HandleHolder<"_enum">, accessNatives: AbilityLevelAccessorNatives<T>);
    [Symbol.iterator](): Iterator<T>;
    getLength(): number;
    getIndexValue(index: number): T;
    setIndexValue(index: number, value: T): boolean;
}
interface AbilityData {
    instance: number | Ability;
}
declare class AbilityData {
    #private;
    constructor(instance: number | Ability);
}

interface IndexAccessArray<T> extends Iterable<T> {
    [key: number]: T;
    [key: string]: any;
    [key: symbol]: any;
}

interface WidgetEventMap extends HandleEventMap {
    death: (event: any) => void;
    damaging: () => void;
    damaged: () => void;
}
declare class Widget<T extends WidgetEventMap = WidgetEventMap> extends Handle<T> {
    constructor(handleHolder: HandleHolder<"widget" | "unit" | "item" | "destructable"> | Widget);
}

interface PlayerEventMap extends HandleEventMap {
}
interface Player {
    get handle(): HandleHolder<"player">;
}
declare class Player<T extends PlayerEventMap = PlayerEventMap> extends Handle<T> {
    constructor(handleHolder: HandleHolder<"player">);
    static getById<T extends Player = Player>(slot: number): T;
    static localPlayer<T extends Player = Player>(): T;
}

interface DestructableEventMap extends WidgetEventMap {
}
declare class Destructable<T extends DestructableEventMap = DestructableEventMap> extends Widget<T> {
    constructor(destructableHandle: HandleHolder<"item">);
    constructor(destructableHandle: Destructable);
    constructor(destructableId: number, x: number, y: number, face: number, scale: number, variation: number);
}

interface ItemEventMap extends WidgetEventMap {
}
declare class Item<T extends ItemEventMap = ItemEventMap> extends Widget<T> {
    constructor(itemHandle: HandleHolder<"item">);
    constructor(itemHandle: Item);
    constructor(itemId: number, x: number, y: number);
}

type HUnitEvent = HandleHolder<"unitevent">;
type HTrigger = HandleHolder<"trigger">;
type HTriggerAction = HandleHolder<"triggeraction">;
type HEvent = HandleHolder<"event">;
type HUnitState = HandleHolder<"unitstate">;
type HLocation = HandleHolder<"location">;
type HBuff = HandleHolder<"buff">;
type HAbility = HandleHolder<"ability">;
type HProjectile = HandleHolder<"projectile">;
type JassCodeCallback = () => number | void;

type UnitEventType = keyof typeof stringToHandle;
declare const stringToHandle: {
    damaged: HUnitEvent;
    damaging: HUnitEvent;
    selected: HUnitEvent;
    deselected: HUnitEvent;
    death: HUnitEvent;
    decay: HUnitEvent;
    detected: HUnitEvent;
    hidden: HUnitEvent;
    stateLimit: HUnitEvent;
    acquiredTarget: HUnitEvent;
    targetInRange: HUnitEvent;
    attacked: HUnitEvent;
    rescued: HUnitEvent;
    constructCancel: HUnitEvent;
    constructFinish: HUnitEvent;
    upgradeStart: HUnitEvent;
    upgradeCancel: HUnitEvent;
    upgradeFinish: HUnitEvent;
    trainStart: HUnitEvent;
    trainCancel: HUnitEvent;
    trainFinish: HUnitEvent;
    researchStart: HUnitEvent;
    researchCancel: HUnitEvent;
    researchFinish: HUnitEvent;
    issuedOrder: HUnitEvent;
    issuedPointOrder: HUnitEvent;
    issuedTargetOrder: HUnitEvent;
    heroLevel: HUnitEvent;
    heroSkill: HUnitEvent;
    heroRevivable: HUnitEvent;
    heroReviveStart: HUnitEvent;
    heroReviveCancel: HUnitEvent;
    heroReviveFinish: HUnitEvent;
    summon: HUnitEvent;
    dropItem: HUnitEvent;
    pickupItem: HUnitEvent;
    useItem: HUnitEvent;
    loaded: HUnitEvent;
    attackFinished: HUnitEvent;
    decayFinished: HUnitEvent;
    buffReceived: HUnitEvent;
    buffRefreshed: HUnitEvent;
    buffEnded: HUnitEvent;
    projectileLaunch: HUnitEvent;
    projectileHit: HUnitEvent;
    abilityAdded: HUnitEvent;
    abilityRemoved: HUnitEvent;
    abilityAutocastOn: HUnitEvent;
    abilityAutocastOff: HUnitEvent;
    spellChannel: HUnitEvent;
    spellCast: HUnitEvent;
    spellEffect: HUnitEvent;
    spellFinish: HUnitEvent;
    spellEndcast: HUnitEvent;
};

declare class TriggerEvent<E extends string = string> {
    readonly event: E;
    constructor(event: E);
}

declare class TriggerUnitEvent<E extends UnitEventType = UnitEventType> extends TriggerEvent {
    readonly triggerUnit: Unit;
    constructor(event: E);
}

declare class UnitEventDeath extends TriggerUnitEvent<"death"> {
    readonly killingUnit: Unit;
    constructor();
}

declare class UnitEventDetected extends TriggerUnitEvent<"detected"> {
    readonly detectingPlayer: Player;
    constructor();
}

declare class UnitEventAcquiredTarget extends TriggerUnitEvent<"acquiredTarget"> {
    readonly target: Unit;
    constructor();
}

declare class UnitEventTargetInRange extends TriggerUnitEvent<"targetInRange"> {
    readonly target: Unit;
    constructor();
}

declare class UnitEventAttacked extends TriggerUnitEvent<"attacked"> {
    readonly attacker: Unit;
    constructor();
}

declare class UnitEventRescued extends TriggerUnitEvent<"rescued"> {
    readonly rescuer: Unit;
    constructor();
}

declare class UnitEventConstructFinish extends TriggerUnitEvent<"constructFinish"> {
    readonly constructedStructure: Unit;
    constructor();
}

declare class UnitEventTrainStart extends TriggerUnitEvent<"trainStart"> {
    readonly trainedUnitType: number;
    constructor();
}

declare class UnitEventTrainCancel extends TriggerUnitEvent<"trainCancel"> {
    readonly trainedUnitType: number;
    constructor();
}

declare class UnitEventTrainFinish extends TriggerUnitEvent<"trainFinish"> {
    readonly trainedUnit: Unit;
    constructor();
}

declare class UnitEventResearchStart extends TriggerUnitEvent<"researchStart"> {
    readonly researched: number;
    constructor();
}

declare class UnitEventResearchCancel extends TriggerUnitEvent<"researchCancel"> {
    readonly researched: number;
    constructor();
}

declare class UnitEventResearchFinish extends TriggerUnitEvent<"researchFinish"> {
    readonly researched: number;
    constructor();
}

declare class UnitEventIssuedOrder extends TriggerUnitEvent<"issuedOrder"> {
    readonly issuedOrderId: number;
    constructor();
}

declare class UnitEventIssuedPointOrder extends TriggerUnitEvent<"issuedPointOrder"> {
    readonly issuedOrderId: number;
    readonly orderPointX: number;
    readonly orderPointY: number;
    constructor();
}

declare class UnitEventIssuedTargetOrder extends TriggerUnitEvent<"issuedTargetOrder"> {
    readonly issuedOrderId: number;
    readonly orderTarget: Widget;
    constructor();
}

declare class UnitEventHeroSkill extends TriggerUnitEvent<"heroSkill"> {
    readonly learnedSkill: number;
    readonly learnedSkillLevel: number;
    constructor();
}

declare class UnitEventHeroRevivable extends TriggerUnitEvent<"heroRevivable"> {
    readonly revivableUnit: Unit;
    constructor();
}

declare class UnitEventHeroReviveStart extends TriggerUnitEvent<"heroReviveStart"> {
    readonly revivingUnit: Unit;
    constructor();
}

declare class UnitEventHeroReviveCancel extends TriggerUnitEvent<"heroReviveCancel"> {
    readonly revivingUnit: Unit;
    constructor();
}

declare class UnitEventHeroReviveFinish extends TriggerUnitEvent<"heroReviveFinish"> {
    readonly revivingUnit: Unit;
    constructor();
}

declare class UnitEventSummon extends TriggerUnitEvent<"summon"> {
    readonly summonedUnit: Unit;
    constructor();
}

declare class UnitEventDropItem extends TriggerUnitEvent<"dropItem"> {
    readonly droppedItem: Item;
    constructor();
}

declare class UnitEventPickupItem extends TriggerUnitEvent<"pickupItem"> {
    readonly pickedupItem: Item;
    constructor();
}

declare class UnitEventUseItem extends TriggerUnitEvent<"useItem"> {
    readonly usedItem: Item;
    constructor();
}

declare class UnitEventLoaded extends TriggerUnitEvent<"loaded"> {
    readonly transport: Unit;
    constructor();
}

declare class UnitEventStateLimit extends TriggerUnitEvent<"stateLimit"> {
    readonly eventUnitState: HUnitState;
    constructor();
}

interface IDisposable {
    dispose: () => void;
}

declare const enum UnitState {
    Life = 0,
    MaxLife = 1,
    Mana = 2,
    MaxMana = 3
}
declare const enum LimitOp {
    lt = 0,
    le = 1,
    eq = 2,
    gt = 3,
    ge = 4
}
declare class UnitStateEmiter implements IDisposable {
    #private;
    constructor(target: Unit, unitState: UnitState, limitOp: LimitOp, value: number);
    get unitState(): UnitState;
    get limitOp(): LimitOp;
    get value(): number;
    get emitSymbol(): StateEventSymbol;
    dispose(): void;
}

declare class UnitEventBuffReceived extends TriggerUnitEvent<"buffReceived"> {
    readonly recievedBuff: HBuff;
    readonly sourceAbility: HAbility;
    readonly sourceUnit: Unit;
    constructor();
}

declare class UnitEventBuffRefreshed extends TriggerUnitEvent<"buffRefreshed"> {
    readonly recievedBuff: HBuff;
    readonly sourceAbility: HAbility;
    readonly sourceUnit: Unit;
    constructor();
}

declare class UnitEventBuffEnded extends TriggerUnitEvent<"buffEnded"> {
    readonly recievedBuff: HBuff;
    readonly sourceAbility: HAbility;
    readonly sourceUnit: Unit;
    constructor();
}

declare class UnitEventProjectileLaunch extends TriggerUnitEvent<"projectileLaunch"> {
    readonly target: Widget;
    readonly projecitle: HProjectile;
    constructor();
}

declare class UnitEventProjectileHit extends TriggerUnitEvent<"projectileHit"> {
    readonly source: Unit;
    readonly projectile: HProjectile;
    constructor();
}

declare class UnitEventSpellChannel extends TriggerUnitEvent<"spellChannel"> {
    readonly abilityId: number;
    readonly ability: HAbility;
    readonly targetX: number;
    readonly targetY: number;
    readonly targetDestructable: Destructable;
    readonly targetItem: Item;
    readonly targetUnit: Unit;
    constructor();
}

declare class UnitEventSpellCast extends TriggerUnitEvent<"spellCast"> {
    readonly abilityId: number;
    readonly ability: HAbility;
    readonly targetX: number;
    readonly targetY: number;
    readonly targetDestructable: Destructable;
    readonly targetItem: Item;
    readonly targetUnit: Unit;
    constructor();
}

declare class UnitEventSpellEffect extends TriggerUnitEvent<"spellEffect"> {
    readonly abilityId: number;
    readonly ability: HAbility;
    readonly targetX: number;
    readonly targetY: number;
    readonly targetDestructable: Destructable;
    readonly targetItem: Item;
    readonly targetUnit: Unit;
    constructor();
}

declare class UnitEventSpellFinish extends TriggerUnitEvent<"spellFinish"> {
    readonly abilityId: number;
    readonly ability: HAbility;
    readonly targetX: number;
    readonly targetY: number;
    readonly targetDestructable: Destructable;
    readonly targetItem: Item;
    readonly targetUnit: Unit;
    constructor();
}

declare class UnitEventSpellEndcast extends TriggerUnitEvent<"spellEndcast"> {
    readonly abilityId: number;
    readonly ability: HAbility;
    readonly targetX: number;
    readonly targetY: number;
    readonly targetDestructable: Destructable;
    readonly targetItem: Item;
    readonly targetUnit: Unit;
    constructor();
}

declare const stateEvent: unique symbol;
type StateEventSymbol = typeof stateEvent;
interface UnitEventMap extends WidgetEventMap {
    selected: (event: TriggerUnitEvent<"selected">) => void;
    deselected: (event: TriggerUnitEvent<"deselected">) => void;
    damaged: () => void;
    damaging: () => void;
    death: (event: UnitEventDeath) => void;
    decay: (event: TriggerUnitEvent<"decay">) => void;
    detected: (event: UnitEventDetected) => void;
    hidden: (event: TriggerUnitEvent<"hidden">) => void;
    stateLimit: (event: UnitEventStateLimit) => void;
    acquiredTarget: (event: UnitEventAcquiredTarget) => void;
    targetInRange: (event: UnitEventTargetInRange) => void;
    attacked: (event: UnitEventAttacked) => void;
    rescued: (event: UnitEventRescued) => void;
    constructCancel: (event: TriggerUnitEvent<"constructCancel">) => void;
    constructFinish: (event: UnitEventConstructFinish) => void;
    upgradeStart: (event: TriggerUnitEvent<"upgradeStart">) => void;
    upgradeCancel: (event: TriggerUnitEvent<"upgradeCancel">) => void;
    upgradeFinish: (event: TriggerUnitEvent<"upgradeFinish">) => void;
    trainStart: (event: UnitEventTrainStart) => void;
    trainCancel: (event: UnitEventTrainCancel) => void;
    trainFinish: (event: UnitEventTrainFinish) => void;
    researchStart: (event: UnitEventResearchStart) => void;
    researchCancel: (event: UnitEventResearchCancel) => void;
    researchFinish: (event: UnitEventResearchFinish) => void;
    issuedOrder: (event: UnitEventIssuedOrder) => void;
    issuedPointOrder: (event: UnitEventIssuedPointOrder) => void;
    issuedTargetOrder: (event: UnitEventIssuedTargetOrder) => void;
    heroLevel: (event: TriggerUnitEvent<"heroLevel">) => void;
    heroSkill: (event: UnitEventHeroSkill) => void;
    heroRevivable: (event: UnitEventHeroRevivable) => void;
    heroReviveStart: (event: UnitEventHeroReviveStart) => void;
    heroReviveCancel: (event: UnitEventHeroReviveCancel) => void;
    heroReviveFinish: (event: UnitEventHeroReviveFinish) => void;
    summon: (event: UnitEventSummon) => void;
    dropItem: (event: UnitEventDropItem) => void;
    pickupItem: (event: UnitEventPickupItem) => void;
    useItem: (event: UnitEventUseItem) => void;
    loaded: (event: UnitEventLoaded) => void;
    attackFinished: (event: TriggerUnitEvent<"attackFinished">) => void;
    decayFinished: (event: TriggerUnitEvent<"decayFinished">) => void;
    buffReceived: (event: UnitEventBuffReceived) => void;
    buffRefreshed: (event: UnitEventBuffRefreshed) => void;
    buffEnded: (event: UnitEventBuffEnded) => void;
    projectileLaunch: (event: UnitEventProjectileLaunch) => void;
    projectileHit: (event: UnitEventProjectileHit) => void;
    abilityAdded: (event: TriggerUnitEvent<"abilityAdded">) => void;
    abilityRemoved: (event: TriggerUnitEvent<"abilityRemoved">) => void;
    abilityAutocastOn: (event: TriggerUnitEvent<"abilityAutocastOn">) => void;
    abilityAutocastOff: (event: TriggerUnitEvent<"abilityAutocastOff">) => void;
    spellChannel: (event: UnitEventSpellChannel) => void;
    spellCast: (event: UnitEventSpellCast) => void;
    spellEffect: (event: UnitEventSpellEffect) => void;
    spellFinish: (event: UnitEventSpellFinish) => void;
    spellEndcast: (event: UnitEventSpellEndcast) => void;
    [stateEvent]: (event: UnitEventStateLimit, emiter: UnitStateEmiter) => void;
}
type UnitOptions = {
    type: "building";
    isAutoBuild?: boolean;
    workersCanAssist?: boolean;
} | {
    type: "illusion";
} | {
    type: "corpse";
};
type UnitIllusionOptions = {
    copyPassives: boolean;
};
interface Unit {
    get handle(): HandleHolder<"unit">;
}
declare class Unit<T extends UnitEventMap = UnitEventMap> extends Widget<T> {
    constructor(unitHandle: HandleHolder<"unit">);
    constructor(unitobject: Unit);
    constructor(unitobject: Player, unitId: number, x: number, y: number, facing: number);
    onUnitState(unitState: UnitState, limitOp: LimitOp, value: number, callback: UnitEventMap[StateEventSymbol]): UnitStateEmiter;
    static createIllusionFromUnit(unit: Unit, options?: UnitIllusionOptions): Unit<UnitEventMap>;
    onEmitterAddListener(event: UnitEventType | number | symbol, listener: (...args: any[]) => void): void;
}

interface WebsocketEvents extends EventMap {
    open: () => void;
    message: (message: string | ArrayBuffer) => void;
}
declare class Websocket extends EventEmitter<WebsocketEvents> {
    #private;
    static CONNECTING: number;
    static OPEN: number;
    static CLOSING: number;
    static CLOSED: number;
    get readyState(): number;
    get bufferedAmount(): number;
    constructor(url: string, headers?: Headers);
    send(message: string | ArrayBuffer | Uint8Array): void;
    close(code?: number, reason?: string): void;
}

declare const stream: any;
declare const buffer: any;
declare const isUjApi: boolean;
declare const console: Console;

declare global {
    /**
     * A low-level object that replaces the handle type in war3js.
     * It is not recommended to use it as an object, as some fields may start to be used by the war3js backend.
     */
    interface HandleHolder<T extends string = string, P = unknown> {
        /**
         * Returns jass handle type. For fake handles this is _enum.
         */
        get type(): T;
        /**
         * The library object this handle is bound to
         */
        payload: P;
        /**
         * Compares handle's internal pointers as numbers. ``null`` is interpreted as 0
         * @param handle another handle for compare
         * @returns true if jass
         */
        equals: (handle: HandleHolder<string> | null) => boolean;
    }
}

export { AbilityData, AbilityLevelAccessor, type AbilityLevelAccessorNatives, Destructable, type DestructableEventMap, type HEvent, type HLocation, type HTrigger, type HTriggerAction, type HUnitEvent, type HUnitState, Handle, type HandleConstructor, type HandleEventMap, type IndexAccessArray, Item, type ItemEventMap, type JassCodeCallback, LimitOp, Player, type PlayerEventMap, type StateEventSymbol, Unit, type UnitEventMap, type UnitIllusionOptions, type UnitOptions, UnitState, Websocket, Widget, type WidgetEventMap, buffer, console, isUjApi, stream };
