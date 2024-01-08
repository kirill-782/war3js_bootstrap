/* eslint-disable matching-export-value-to-file-name */
import { Item } from "../Item.js";

export interface ItemLevelAccessorNatives<T> {
    get: (item: HandleHolder<"item">, field: HandleHolder<"_enum">) => T;
    set: (item: HandleHolder<"item">, field: HandleHolder<"_enum">, value: T) => boolean;

    baseGet: (itemId: number, field: HandleHolder<"_enum">) => T;
    baseSet: (itemId: number, field: HandleHolder<"_enum">, value: T) => boolean;
}

export interface ItemData {
    instance: number | Item;
}

export class ItemLevelAccessor<T> {
    #itemData: ItemData;
    #field: HandleHolder<"_enum">;

    #accessorNatives: ItemLevelAccessorNatives<T>;

    constructor(itemData: ItemData, field: HandleHolder<"_enum">, accessNatives: ItemLevelAccessorNatives<T>) {
        this.#itemData = itemData;
        this.#field = field;

        this.#accessorNatives = accessNatives;
    }

    public getValue() {
        return typeof this.#itemData.instance === "number"
            ? this.#accessorNatives.baseGet(this.#itemData.instance, this.#field)
            : this.#accessorNatives.get(this.#itemData.instance.handle, this.#field);
    }

    public setValue(value: T) {
        return typeof this.#itemData.instance === "number"
            ? this.#accessorNatives.baseSet(this.#itemData.instance, this.#field, value)
            : this.#accessorNatives.set(this.#itemData.instance.handle, this.#field, value);
    }
}

export class ItemData {
    #_instance: number | Item;

    constructor(instance: number | Item) {
        this.#_instance = instance;

        Object.defineProperty(this, "instance", {
            value: instance,
            writable: false,
        });
    }
}
