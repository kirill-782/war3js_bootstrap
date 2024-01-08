/* eslint-disable matching-export-value-to-file-name */
import { Destructable } from "../Destructable.js";

export interface DestructableLevelAccessorNatives<T> {
    get: (destructable: HandleHolder<"destructable">, field: HandleHolder<"_enum">) => T;
    set: (destructable: HandleHolder<"destructable">, field: HandleHolder<"_enum">, value: T) => boolean;

    baseGet: (destructableId: number, field: HandleHolder<"_enum">) => T;
    baseSet: (destructableId: number, field: HandleHolder<"_enum">, value: T) => boolean;
}

export interface DestructableData {
    instance: number | Destructable;
}

export class DestructableLevelAccessor<T> {
    #destructableData: DestructableData;
    #field: HandleHolder<"_enum">;

    #accessorNatives: DestructableLevelAccessorNatives<T>;

    constructor(destructableData: DestructableData, field: HandleHolder<"_enum">, accessNatives: DestructableLevelAccessorNatives<T>) {
        this.#destructableData = destructableData;
        this.#field = field;

        this.#accessorNatives = accessNatives;
    }

    public getValue() {
        return typeof this.#destructableData.instance === "number"
            ? this.#accessorNatives.baseGet(this.#destructableData.instance, this.#field)
            : this.#accessorNatives.get(this.#destructableData.instance.handle, this.#field);
    }

    public setValue(value: T) {
        return typeof this.#destructableData.instance === "number"
            ? this.#accessorNatives.baseSet(this.#destructableData.instance, this.#field, value)
            : this.#accessorNatives.set(this.#destructableData.instance.handle, this.#field, value);
    }
}

export class DestructableData {
    #_instance: number | Destructable;

    constructor(instance: number | Destructable) {
        this.#_instance = instance;

        Object.defineProperty(this, "instance", {
            value: instance,
            writable: false,
        });
    }
}
