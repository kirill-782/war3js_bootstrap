/* eslint-disable matching-export-value-to-file-name */
import { Unit } from "../Unit.js";

export interface UnitLevelAccessorNatives<T> {
    get: (unit: HandleHolder<"unit">, field: HandleHolder<"_enum">) => T;
    set: (unit: HandleHolder<"unit">, field: HandleHolder<"_enum">, value: T) => boolean;

    baseGet: (unitId: number, field: HandleHolder<"_enum">) => T;
    baseSet: (unitId: number, field: HandleHolder<"_enum">, value: T) => boolean;

    weaponGet: (unit: HandleHolder<"unit">, field: HandleHolder<"_enum">, index: number) => T;
    weaponSet: (unit: HandleHolder<"unit">, field: HandleHolder<"_enum">, index: number, value: T) => boolean;

    weaponBaseGet: (unitId: number, field: HandleHolder<"_enum">, index: number) => T;
    weaponBaseSet: (unitId: number, field: HandleHolder<"_enum">, index: number, value: T) => boolean;
}

export interface UnitData {
    instance: number | Unit;
}

export class UnitLevelAccessor<T> implements Iterable<T> {
    #unitData: UnitData;
    #field: HandleHolder<"_enum">;

    #accessorNatives: UnitLevelAccessorNatives<T>;

    constructor(unitData: UnitData, field: HandleHolder<"_enum">, accessNatives: UnitLevelAccessorNatives<T>) {
        this.#unitData = unitData;
        this.#field = field;

        this.#accessorNatives = accessNatives;
    }

    *[Symbol.iterator](): Iterator<T> {
        for (let i = 0; i < this.getLength(); ++i) {
            yield this.getIndexValue(i);
        }
    }

    public getLength() {
        return 2;
    }

    public getValue() {
        return typeof this.#unitData.instance === "number"
            ? this.#accessorNatives.baseGet(this.#unitData.instance, this.#field)
            : this.#accessorNatives.get(this.#unitData.instance.handle, this.#field);
    }

    public setValue(value: T) {
        return typeof this.#unitData.instance === "number"
            ? this.#accessorNatives.baseSet(this.#unitData.instance, this.#field, value)
            : this.#accessorNatives.set(this.#unitData.instance.handle, this.#field, value);
    }

    public getIndexValue(index: number) {
        return typeof this.#unitData.instance === "number"
            ? this.#accessorNatives.weaponBaseGet(this.#unitData.instance, this.#field, index)
            : this.#accessorNatives.weaponGet(this.#unitData.instance.handle, this.#field, index);
    }

    public setIndexValue(index: number, value: T) {
        return typeof this.#unitData.instance === "number"
            ? this.#accessorNatives.weaponBaseSet(this.#unitData.instance, this.#field, index, value)
            : this.#accessorNatives.weaponSet(this.#unitData.instance.handle, this.#field, index, value);
    }
}

export class unitData {
    #_instance: number | Unit;

    constructor(instance: number | Unit) {
        this.#_instance = instance;

        Object.defineProperty(this, "instance", {
            value: instance,
            writable: false,
        });
    }
}
