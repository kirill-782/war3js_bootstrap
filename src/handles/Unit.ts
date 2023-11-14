import { Widget, WidgetEventMap } from "./Widget.js";

import { Player } from "./Player.js";
import { EventEmitterHook } from "../utils/EventEmitterHook.js";
import { UnitEventType, unitEmiter } from "../services/emitters/UnitEmiter.js";
import { TriggerUnitEvent } from "../triggerEvents/unit/TriggerUnitEvent.js";
import { UnitEventDeath } from "../triggerEvents/unit/UnitEventDeath.js";
import { UnitEventDetected } from "../triggerEvents/unit/UnitEventDetected.js";
import { UnitEventStateLimit } from "../triggerEvents/unit/UnitEventStateLimit.js";
import { UnitEventAcquiredTarget } from "../triggerEvents/unit/UnitEventAcquiredTarget.js";
import { UnitEventTargetInRange } from "../triggerEvents/unit/UnitEventTargetInRange.js";
import { UnitEventAttacked } from "../triggerEvents/unit/UnitEventAttacked.js";
import { UnitEventRescued } from "../triggerEvents/unit/UnitEventRescued.js";
import { UnitEventConstructFinish } from "../triggerEvents/unit/UnitEventConstructFinish.js";
import { UnitEventTrainStart } from "../triggerEvents/unit/UnitEventTrainStart.js";
import { UnitEventTrainCancel } from "../triggerEvents/unit/UnitEventTrainCancel.js";
import { UnitEventTrainFinish } from "../triggerEvents/unit/UnitEventTrainFinish.js";
import { UnitEventResearchStart } from "../triggerEvents/unit/UnitEventResearchStart.js";
import { UnitEventResearchCancel } from "../triggerEvents/unit/UnitEventResearchCancel.js";
import { UnitEventResearchFinish } from "../triggerEvents/unit/UnitEventResearchFinish.js";
import { UnitEventIssuedOrder } from "../triggerEvents/unit/UnitEventIssuedOrder.js";
import { UnitEventIssuedPointOrder } from "../triggerEvents/unit/UnitEventIssuedPointOrder.js";
import { UnitEventIssuedTargetOrder } from "../triggerEvents/unit/UnitEventIssuedTargetOrder.js";
import { UnitEventHeroSkill } from "../triggerEvents/unit/UnitEventHeroSkill.js";
import { UnitEventHeroRevivable } from "../triggerEvents/unit/UnitEventHeroRevivable.js";
import { UnitEventHeroReviveStart } from "../triggerEvents/unit/UnitEventHeroReviveStart.js";
import { UnitEventHeroReviveCancel } from "../triggerEvents/unit/UnitEventHeroReviveCancel.js";
import { UnitEventHeroReviveFinish } from "../triggerEvents/unit/UnitEventHeroReviveFinish.js";
import { UnitEventSummon } from "../triggerEvents/unit/UnitEventSummon.js";
import { UnitEventDropItem } from "../triggerEvents/unit/UnitEventDropItem.js";
import { UnitEventPickupItem } from "../triggerEvents/unit/UnitEventPickupItem.js";
import { UnitEventUseItem } from "../triggerEvents/unit/UnitEventUseItem.js";
import { UnitEventLoaded } from "../triggerEvents/unit/UnitEventLoaded.js";
import {
    CreateUnitNe,
    CreateCorpseNe,
    CreateBuildingExNe,
    CreateIllusionNe,
    CreateIllusionFromUnitExNe,
} from "../utils/common.js";

const eventUnitEmiter = unitEmiter;

export interface UnitEventMap extends WidgetEventMap {
    selected: (event: TriggerUnitEvent<"selected">) => void;
    deselected: (event: TriggerUnitEvent<"deselected">) => void;
    damaged: () => void; // TODO: add event arg when UnitEventDamaged will be done
    damaging: () => void; // TODO: add event arg when UnitEventDamaging will be done
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
}

export interface Unit {
    get handle(): HandleHolder<"unit">;
}

export type UnitOptions =
    | {
          type: "building";
          isAutoBuild?: boolean;
          workersCanAssist?: boolean;
      }
    | {
          type: "illusion";
      }
    | {
          type: "corpse";
      };

export type UnitIllusionOptions = {
    copyPassives: boolean;
};

export class Unit<T extends UnitEventMap = UnitEventMap> extends Widget<T> {
    constructor(unitHandle: HandleHolder<"unit">);
    constructor(unitobject: Unit);
    constructor(unitobject: Player, unitId: number, x: number, y: number, facing: number);
    constructor(
        arg: Unit | Player | HandleHolder<"unit">,
        unitId?: number,
        x?: number,
        y?: number,
        facing?: number,
        options?: UnitOptions,
    ) {
        if (arg instanceof Unit || arg instanceof HandleHolder) super(arg);
        else if (arg instanceof Player) {
            if (!options) {
                super(CreateUnitNe(arg.handle, unitId, x, y, facing));
            } else if (options.type === "corpse") {
                super(CreateCorpseNe(arg.handle, unitId, x, y, facing));
            } else if (options.type === "building") {
                super(
                    CreateBuildingExNe(arg.handle, unitId, x, y, facing, options.isAutoBuild, options.workersCanAssist),
                );
            } else if (options.type === "illusion") {
                super(CreateIllusionNe(arg.handle, unitId, x, y, facing));
            }
        } else {
            throw new TypeError("Unknown first arg");
        }

        EventEmitterHook.hookAddListener(Unit);
    }

    public static createIllusionFromUnit(unit: Unit, options?: UnitIllusionOptions) {
        const handleHolder = CreateIllusionFromUnitExNe(unit.handle, options?.copyPassives);

        return new Unit(handleHolder);
    }

    /* eslint-disable @typescript-eslint/no-unused-vars */
    public onEmitterAddListener(event: UnitEventType | number | symbol, listener: (...args: any[]) => void) {
        if (eventUnitEmiter.isSupport(event) && typeof event === "string") {
            eventUnitEmiter.subscribe(event, this);
        }
    }
}
