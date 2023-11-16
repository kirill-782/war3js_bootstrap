import { StateEventSymbol, Unit } from "../../handles/Unit.js";
import { UnitEventStateLimit } from "../../triggerEvents/unit/UnitEventStateLimit.js";
import {
    CreateTriggerNe,
    HTrigger,
    TriggerRegisterUnitStateEventNe,
    HUnitState as UnitStateHandle,
    HLimitOp as LimitOpHandle,
    TriggerAddActionNe,
    UnitStates,
    LimitOps,
    DestroyTrigger,
} from "../../utils/common.js";
import { IDisposable } from "../IDisposable.js";

export const enum UnitState {
    Life,
    MaxLife,
    Mana,
    MaxMana,
}

export const enum LimitOp {
    lt,
    le,
    eq,
    gt,
    ge,
}

export class UnitStateEmiter implements IDisposable {
    #unit: Unit;
    #trigger: HTrigger;
    #emitSymbolEvent: StateEventSymbol;

    #unitState: UnitState;
    #limitOp: LimitOp;

    #value: number;

    constructor(target: Unit, unitState: UnitState, limitOp: LimitOp, value: number) {
        this.#trigger = CreateTriggerNe();
        this.#unit = target;

        this.#unitState = unitState;
        this.#limitOp = limitOp;
        this.#value = value;

        let unitStateHandle: UnitStateHandle;
        let limitOpHandle: LimitOpHandle;

        switch (unitState) {
            case UnitState.Life:
                unitStateHandle = UnitStates.UNIT_STATE_LIFE;
                break;
            case UnitState.MaxLife:
                unitStateHandle = UnitStates.UNIT_STATE_MAX_LIFE;
                break;
            case UnitState.Mana:
                unitStateHandle = UnitStates.UNIT_STATE_MANA;
                break;
            case UnitState.MaxMana:
                unitStateHandle = UnitStates.UNIT_STATE_MAX_MANA;
                break;
            default:
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const deadVar: never = unitState;
        }

        switch (limitOp) {
            case LimitOp.lt:
                limitOpHandle = LimitOps.LESS_THAN;
                break;
            case LimitOp.le:
                limitOpHandle = LimitOps.LESS_THAN_OR_EQUAL;
                break;
            case LimitOp.eq:
                limitOpHandle = LimitOps.EQUAL;
                break;
            case LimitOp.gt:
                limitOpHandle = LimitOps.GREATER_THAN;
                break;
            case LimitOp.ge:
                limitOpHandle = LimitOps.GREATER_THAN_OR_EQUAL;
                break;
            default:
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const deadVar: never = limitOp;
        }

        this.#emitSymbolEvent = Symbol(`stateEventSymbol-${unitState}-${limitOp}-${value}`) as StateEventSymbol;

        TriggerRegisterUnitStateEventNe(this.#trigger, target.handle, unitStateHandle, limitOpHandle, value);
        TriggerAddActionNe(this.#trigger, () => {
            if (!target.emit(this.#emitSymbolEvent, new UnitEventStateLimit(), this)) {
                this.dispose(); // no listeners
            }
        });

        this.#unit.on("remove", () => {
            this.dispose();
        });
    }

    get unitState() {
        return this.#unitState;
    }

    get limitOp() {
        return this.#limitOp;
    }

    get value() {
        return this.#value;
    }

    get emitSymbol(): StateEventSymbol {
        return this.#emitSymbolEvent;
    }

    public dispose() {
        DestroyTrigger(this.#trigger);
    }
}
