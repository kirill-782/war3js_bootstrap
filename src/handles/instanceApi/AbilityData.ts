/* eslint-disable matching-export-value-to-file-name */
import { HandleHolder } from "@war3js/unsafe";
import { ABILITY_IF_LEVELS, GetAbilityBaseIntegerFieldById, GetAbilityIntegerField } from "../../utils/common.js";
import { Ability } from "../Ability.js";

export interface AbilityLevelAccessorNatives<T> {
    get: (ability: HandleHolder<"ability">, field: HandleHolder<"agentdatafield">, level: number) => T;
    set: (ability: HandleHolder<"ability">, field: HandleHolder<"agentdatafield">, level: number, value: T) => boolean;

    baseGet: (abilId: number, field: HandleHolder<"agentdatafield">, level: number) => T;
    baseSet: (ability: number, field: HandleHolder<"agentdatafield">, level: number, value: T) => boolean;
}

export interface AbilityData {
    instance: number | Ability;
}

export class AbilityLevelAccessor<T> implements Iterable<T> {
    #abilityData: AbilityData;
    #field: HandleHolder<"agentdatafield">;

    #accessorNatives: AbilityLevelAccessorNatives<T>;

    constructor(
        abilityData: AbilityData,
        field: HandleHolder<"agentdatafield">,
        accessNatives: AbilityLevelAccessorNatives<T>,
    ) {
        this.#abilityData = abilityData;
        this.#field = field;

        this.#accessorNatives = accessNatives;
    }

    *[Symbol.iterator](): Iterator<T> {
        for (let i = 0; i < this.getLength(); ++i) {
            yield this.getIndexValue(i);
        }
    }

    public getLength() {
        return typeof this.#abilityData.instance === "number"
            ? GetAbilityBaseIntegerFieldById(this.#abilityData.instance, ABILITY_IF_LEVELS)
            : GetAbilityIntegerField(this.#abilityData.instance.handle, ABILITY_IF_LEVELS);
    }

    public getIndexValue(index: number) {
        return typeof this.#abilityData.instance === "number"
            ? this.#accessorNatives.baseGet(this.#abilityData.instance, this.#field, index)
            : this.#accessorNatives.get(this.#abilityData.instance.handle, this.#field, index);
    }

    public setIndexValue(index: number, value: T) {
        return typeof this.#abilityData.instance === "number"
            ? this.#accessorNatives.baseSet(this.#abilityData.instance, this.#field, index, value)
            : this.#accessorNatives.set(this.#abilityData.instance.handle, this.#field, index, value);
    }
}

export class AbilityData {
    #_instance: number | Ability;

    constructor(instance: number | Ability) {
        this.#_instance = instance;

        Object.defineProperty(this, "instance", {
            value: instance,
            writable: false,
        });
    }
}
