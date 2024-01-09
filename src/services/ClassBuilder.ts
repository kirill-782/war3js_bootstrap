import { getNativeByName, getListNatives, getGlobalsKeys, getGlobal, HandleHolder } from "@war3js/unsafe";
import { Handle } from "../handles/Handle.js";
import { toHandleHolderSoft } from "../utils/ToHandleHolder.js";
import { fromHandleHolderSoft } from "../utils/FromHandleHolder.js";
import { isNode } from "../utils/runtime.js";
import { AbilityData, AbilityLevelAccessor, AbilityLevelAccessorNatives } from "../handles/instanceApi/AbilityData.js";
import { screamCaseToCamelCase } from "../utils/utils.js";
import {
    GetAbilityBaseBooleanFieldById,
    GetAbilityBaseBooleanLevelFieldById,
    GetAbilityBaseIntegerFieldById,
    GetAbilityBaseIntegerLevelFieldById,
    GetAbilityBaseRealFieldById,
    GetAbilityBaseRealLevelFieldById,
    GetAbilityBaseStringFieldById,
    GetAbilityBaseStringLevelFieldById,
    GetAbilityBooleanField,
    GetAbilityBooleanLevelField,
    GetAbilityIntegerField,
    GetAbilityIntegerLevelField,
    GetAbilityRealField,
    GetAbilityRealLevelField,
    GetAbilityStringField,
    GetAbilityStringLevelField,
    SetAbilityBaseBooleanFieldById,
    SetAbilityBaseBooleanLevelFieldById,
    SetAbilityBaseIntegerFieldById,
    SetAbilityBaseIntegerLevelFieldById,
    SetAbilityBaseRealFieldById,
    SetAbilityBaseRealLevelFieldById,
    SetAbilityBaseStringFieldById,
    SetAbilityBaseStringLevelFieldById,
    SetAbilityBooleanField,
    SetAbilityBooleanLevelField,
    SetAbilityIntegerField,
    SetAbilityIntegerLevelField,
    SetAbilityRealField,
    SetAbilityRealLevelField,
    SetAbilityStringField,
    SetAbilityStringLevelField,
} from "../utils/common.js";

type NativeFunctionType<R, A extends any[]> = ReturnType<typeof getNativeByName<R, A>>;
type AbstractNative = NativeFunctionType<any, any[]>;

type HandleConstructor = {
    new (...args: any): Handle;
};

export type AutoMappedMethodMetadata =
    | {
          methodType: "method";
          argTypes: string[];
          argNames: string[];
          returnType: string;
          nativeName: string;
      }
    | {
          methodType: "chainProperty";
          type: string;
          getNativeName: string;
          setNativeName: string;
      }
    | {
          methodType: "instanceApiAccessor";
          type: string;
          readonly?: boolean;
          isIndexAccess?: boolean;
      };

interface NativeMeta {
    native: AbstractNative;
    useCount: number;
}

interface MethodNativeMeta {
    callNative: AbstractNative;
    name: string;
}

interface ChainPropertyNativeMeta {
    getterNative: AbstractNative;
    setterNative: AbstractNative;
    name: string;
    argumentType: string;
}

const typeNameToTypePart = (typeName: string) => {
    return typeName.charAt(0).toLocaleUpperCase() + typeName.substring(1);
};

const toHandleHolderArgs = (args: any[]) => {
    return args.map((i) => toHandleHolderSoft(i));
};

const typeGenMetaSymbol = Symbol("typeGenMeta");
const typeGenNeedAssist = isNode;

export const isClassHasModified = (value: any): boolean => {
    return !!value[typeGenMetaSymbol];
};

export const getAccessorMeta = (key: string | symbol, clazz: any): AutoMappedMethodMetadata => {
    return clazz[typeGenMetaSymbol][key];
};

export const getMethodMeta = (value: any): AutoMappedMethodMetadata => {
    return value[typeGenMetaSymbol];
};

export class HandleBuilder {
    private nativesMeta: Record<string, NativeMeta>;
    private unusedNatives: Record<string, NativeMeta>;

    constructor(nativeList?: Record<string, AbstractNative>) {
        nativeList = nativeList || getListNatives();

        this.nativesMeta = {};

        Object.entries(nativeList).forEach((i) => {
            this.nativesMeta[i[0]] = {
                native: i[1],
                useCount: 0,
            };
        });

        this.unusedNatives = { ...this.nativesMeta };
    }

    public addMethods(target: HandleConstructor, handleType: string) {
        if (typeGenNeedAssist) {
            (target as any)[typeGenMetaSymbol] = true;
        }

        const typePart = typeNameToTypePart(handleType);

        const methodNatives = Object.entries(this.unusedNatives).filter((i) => {
            const native = i[1].native;
            return native.parametres.length >= 1 && native.parametres[0] === handleType;
        });

        const methods: Array<MethodNativeMeta> = methodNatives.map((i) => {
            let methodName = i[0].replace(typePart, "");
            methodName = methodName.charAt(0).toLocaleLowerCase() + methodName.substring(1);

            return {
                name: methodName,
                callNative: i[1].native,
            };
        });

        methods.forEach((method) => {
            target.prototype[method.name] = function (this: Handle, ...args: any[]) {
                if (!(this instanceof target)) throw new TypeError("Illegal call");

                return fromHandleHolderSoft(method.callNative(this.handle, ...toHandleHolderArgs(args)));
            };

            if (typeGenNeedAssist) {
                const methodMeta: AutoMappedMethodMetadata = {
                    methodType: "method",
                    nativeName: method.callNative.nativeName,
                    argTypes: [...method.callNative.parametres].splice(1),
                    argNames: [...method.callNative.parametresName].splice(1),
                    returnType: method.callNative.returnType,
                };

                target.prototype[method.name][typeGenMetaSymbol] = methodMeta;
            }
        });
    }

    public addChainProperties(target: HandleConstructor, handleType: string) {
        if (typeGenNeedAssist) {
            (target as any)[typeGenMetaSymbol] = true;
        }

        const typePart = typeNameToTypePart(handleType);

        const properties = new Array<ChainPropertyNativeMeta>();

        // Select set natives

        const setNatives = Object.entries(this.unusedNatives).filter((i) => {
            const native = i[1].native;

            return (
                i[0].startsWith("Set") &&
                i[0].substring(3).startsWith(typePart) &&
                native.parametres.length === 2 &&
                native.returnType === "V" &&
                native.parametres[0] === handleType
            );
        });

        // Select get natives and build property pair

        const getNatives = Object.entries(this.unusedNatives).filter((i) => {
            let nativeName = i[0];
            const native = i[1].native;

            if (!nativeName.startsWith("Get") && !nativeName.startsWith("Is")) return false;

            nativeName = nativeName.substring(nativeName.startsWith("Get") ? 3 : 2);
            if (!nativeName.startsWith(typePart)) return false;

            nativeName = nativeName.substring(typePart.length);

            if (native.parametres.length !== 1 || native.parametres[0] !== handleType) return false;

            const setterNative = setNatives.find((j) => {
                return j[0].endsWith(nativeName);
            });

            if (!setterNative) return false;

            if (setterNative[1].native.parametres[1] !== native.returnType) return false;

            // Append property

            properties.push({
                getterNative: native,
                setterNative: setterNative[1].native,
                name: nativeName.charAt(0).toLocaleLowerCase() + nativeName.substring(1),
                argumentType: native.returnType,
            });

            return true;
        });

        // method

        properties.forEach((property) => {
            target.prototype[property.name] = function (this: Handle, value?: any) {
                if (!(this instanceof target)) throw new TypeError("Illegal call");

                if (value === undefined) {
                    return fromHandleHolderSoft(property.getterNative(this.handle));
                }

                let newValue = value;

                if (typeof value === "function") {
                    newValue = value.call(this, fromHandleHolderSoft(property.getterNative(this.handle)));
                }

                property.setterNative(this.handle, toHandleHolderSoft(newValue));

                return this;
            };

            if (typeGenNeedAssist) {
                const methodMeta: AutoMappedMethodMetadata = {
                    getNativeName: property.getterNative.nativeName,
                    setNativeName: property.setterNative.nativeName,
                    methodType: "chainProperty",
                    type: property.argumentType,
                };

                target.prototype[property.name][typeGenMetaSymbol] = methodMeta;
            }
        });

        this.markNativesAsUsed(getNatives.map((i) => i[0]));
        this.markNativesAsUsed(setNatives.map((i) => i[0]));
    }

    public markNativesAsUsed(natives: string[]) {
        natives.forEach((i) => {
            this.markNativeAsUsed(i);
        });
    }

    public markNativeAsUsed(natives: string) {
        if (!this.unusedNatives[natives]) return;

        this.unusedNatives[natives].useCount++;
        delete this.unusedNatives[natives];
    }
}

export interface IndexAccessArray<T> extends Iterable<T> {
    [key: number]: T;
    [key: string]: any;
    [key: symbol]: any;
}

export class InstanceApiBuilder {
    appendAbilityData(abilityData: new (...args: any[]) => AbilityData) {
        const abilityFieldGlobals = getGlobalsKeys().filter((i) => i.startsWith("ABILITY"));

        const abilityLevelRealFields = new Array<string>();
        const abilityLevelBooleanFields = new Array<string>();
        const abilityLevelIntegerFields = new Array<string>();
        const abilityLevelStringFields = new Array<string>();

        const abilityRealFields = new Array<string>();
        const abilityBooleanFields = new Array<string>();
        const abilityIntegerFields = new Array<string>();
        const abilityStringFields = new Array<string>();

        abilityFieldGlobals.forEach((i) => {
            const globalNameTokens = i.split("_");

            if (globalNameTokens.length < 2) return;

            switch (globalNameTokens[1]) {
                case "IF":
                    abilityIntegerFields.push(i);
                    break;
                case "BF":
                    abilityBooleanFields.push(i);
                    break;
                case "RF":
                    abilityRealFields.push(i);
                    break;
                case "SF":
                    abilityStringFields.push(i);
                    break;

                case "ILF":
                    abilityLevelIntegerFields.push(i);
                    break;
                case "BLF":
                    abilityLevelBooleanFields.push(i);
                    break;
                case "RLF":
                    abilityLevelRealFields.push(i);
                    break;
                case "SLF":
                    abilityLevelStringFields.push(i);
                    break;
            }
        });

        if (typeGenNeedAssist) {
            (abilityData as any)[typeGenMetaSymbol] = {};
        }

        // Append plain fields

        {
            interface InstanceApiAccessNatives<T> {
                get: (ability: HandleHolder<"ability">, field: HandleHolder<"_enum">) => T;
                set: (ability: HandleHolder<"ability">, field: HandleHolder<"_enum">, value: T) => boolean;

                baseGet: (abilId: number, field: HandleHolder<"_enum">) => T;
                baseSet: (ability: number, field: HandleHolder<"_enum">, value: T) => boolean;
            }

            function defineAccessor<T>(
                accessNatives: InstanceApiAccessNatives<T>,
                propertyName: string,
                fieldId: HandleHolder<"_enum">,
                isReadOnly: boolean,
            ) {
                propertyName =
                    (accessNatives.get as any).returnType.toLocaleLowerCase() +
                    propertyName.charAt(0).toUpperCase() +
                    propertyName.substring(1);

                if (typeGenNeedAssist) {
                    (abilityData as any)[typeGenMetaSymbol][propertyName] = {
                        methodType: "instanceApiAccessor",
                        isIndexAccess: false,
                        readonly: isReadOnly,
                        type: (accessNatives.get as any).returnType, // Ебать я гений
                    } as AutoMappedMethodMetadata;
                }

                const propertyDesctiptor: PropertyDescriptor = {
                    get(this: AbilityData) {
                        return typeof this.instance === "number"
                            ? accessNatives.baseGet(this.instance, fieldId)
                            : accessNatives.get(this.instance.handle, fieldId);
                    },
                    enumerable: true,
                };

                if (!isReadOnly) {
                    propertyDesctiptor.set = function (this: AbilityData, value: T) {
                        return typeof this.instance === "number"
                            ? accessNatives.baseSet(this.instance, fieldId, value)
                            : accessNatives.set(this.instance.handle, fieldId, value);
                    };
                }

                Object.defineProperty(abilityData.prototype, propertyName, propertyDesctiptor);
            }

            // Real

            abilityRealFields.forEach((i) => {
                defineAccessor(
                    {
                        get: GetAbilityRealField,
                        baseGet: GetAbilityBaseRealFieldById,
                        set: SetAbilityRealField,
                        baseSet: SetAbilityBaseRealFieldById,
                    },
                    screamCaseToCamelCase(i.split("_").slice(2).join("_")),
                    getGlobal(i) as HandleHolder<"_enum">,
                    false,
                );
            });

            // Integer

            abilityIntegerFields.forEach((i) => {
                defineAccessor(
                    {
                        get: GetAbilityIntegerField,
                        baseGet: GetAbilityBaseIntegerFieldById,
                        set: SetAbilityIntegerField,
                        baseSet: SetAbilityBaseIntegerFieldById,
                    },
                    screamCaseToCamelCase(i.split("_").slice(2).join("_")),
                    getGlobal(i) as HandleHolder<"_enum">,
                    false,
                );
            });

            // Boolean

            abilityBooleanFields.forEach((i) => {
                defineAccessor(
                    {
                        get: GetAbilityBooleanField,
                        baseGet: GetAbilityBaseBooleanFieldById,
                        set: SetAbilityBooleanField,
                        baseSet: SetAbilityBaseBooleanFieldById,
                    },
                    screamCaseToCamelCase(i.split("_").slice(2).join("_")),
                    getGlobal(i) as HandleHolder<"_enum">,
                    false,
                );
            });

            // String

            abilityStringFields.forEach((i) => {
                defineAccessor(
                    {
                        get: GetAbilityStringField,
                        baseGet: GetAbilityBaseStringFieldById,
                        set: SetAbilityStringField,
                        baseSet: SetAbilityBaseStringFieldById,
                    },
                    screamCaseToCamelCase(i.split("_").slice(2).join("_")),
                    getGlobal(i) as HandleHolder<"_enum">,
                    false,
                );
            });
        }

        // append level fields

        {
            function defineAccessor<T>(
                accessNatives: AbilityLevelAccessorNatives<T>,
                propertyName: string,
                fieldId: HandleHolder<"_enum">,
                isReadOnly: boolean,
            ) {
                propertyName =
                    (accessNatives.get as any).returnType.toLocaleLowerCase() +
                    "l" +
                    propertyName.charAt(0).toUpperCase() +
                    propertyName.substring(1);

                if (typeGenNeedAssist) {
                    (abilityData as any)[typeGenMetaSymbol][propertyName] = {
                        methodType: "instanceApiAccessor",
                        isIndexAccess: true,
                        readonly: isReadOnly,
                        type: (accessNatives.get as any).returnType,
                    } as AutoMappedMethodMetadata;
                }

                let levelAabilityAccessor: AbilityLevelAccessor<T> = null;
                let levelAabilityAccessorProxy: IndexAccessArray<T> = null;

                function createProxy(levelAabilityAccessor: AbilityLevelAccessor<T>): IndexAccessArray<T> {
                    return new Proxy(levelAabilityAccessor, {
                        get(target, p) {
                            if (typeof p === "symbol") return (target as any)[p];

                            if (p === "length") return target.getLength();

                            const inxex = Number(p);
                            if (!Number.isInteger(inxex)) return (target as any)[p];

                            return target.getIndexValue(inxex);
                        },
                        set(target, p, newValue) {
                            if (typeof p === "symbol") {
                                (target as any)[p] = newValue;

                                return true;
                            }

                            if (p === "length") return false;

                            const inxex = Number(p);
                            if (!Number.isInteger(inxex)) {
                                (target as any)[p] = newValue;

                                return true;
                            }

                            return target.setIndexValue(inxex, newValue);
                        },
                        getOwnPropertyDescriptor(target, p) {
                            const inxex = Number(p);

                            if (Number.isInteger(inxex)) {
                                if (inxex < target.getLength())
                                    return {
                                        enumerable: true,
                                    };

                                return {
                                    enumerable: false,
                                };
                            }

                            return Object.getOwnPropertyDescriptor(target, p);
                        },
                        ownKeys(target) {
                            const numbersArray = [];
                            const length = target.getLength();

                            for (let i = 0; i < length; i++) {
                                numbersArray.push(String(i));
                            }

                            return [...Reflect.ownKeys(target), ...numbersArray];
                        },
                    }) as any as IndexAccessArray<T>;
                }

                const propertyDesctiptor: PropertyDescriptor = {
                    get(this: AbilityData) {
                        if (!levelAabilityAccessor) {
                            levelAabilityAccessor = new AbilityLevelAccessor(this, fieldId, accessNatives);
                            levelAabilityAccessorProxy = createProxy(levelAabilityAccessor);
                        }

                        return levelAabilityAccessorProxy;
                    },
                    enumerable: true,
                };

                if (!isReadOnly) {
                    propertyDesctiptor.set = function (this: AbilityData, value: unknown) {
                        if (!levelAabilityAccessor) {
                            levelAabilityAccessor = new AbilityLevelAccessor(this, fieldId, accessNatives);
                            levelAabilityAccessorProxy = createProxy(levelAabilityAccessor);
                        }

                        if (typeof value === "object" && Symbol.iterator in value) {
                            let i = 0;

                            for (const itValue in value) {
                                levelAabilityAccessor.setIndexValue(i++, itValue as T);
                            }
                        }
                    };
                }

                Object.defineProperty(abilityData.prototype, propertyName, propertyDesctiptor);
            }

            // Real

            abilityLevelRealFields.forEach((i) => {
                defineAccessor(
                    {
                        get: GetAbilityRealLevelField,
                        baseGet: GetAbilityBaseRealLevelFieldById,
                        set: SetAbilityRealLevelField,
                        baseSet: SetAbilityBaseRealLevelFieldById,
                    },
                    screamCaseToCamelCase(i.split("_").slice(2).join("_")),
                    getGlobal(i) as HandleHolder<"_enum">,
                    false,
                );
            });

            // Integer

            abilityLevelIntegerFields.forEach((i) => {
                defineAccessor(
                    {
                        get: GetAbilityIntegerLevelField,
                        baseGet: GetAbilityBaseIntegerLevelFieldById,
                        set: SetAbilityIntegerLevelField,
                        baseSet: SetAbilityBaseIntegerLevelFieldById,
                    },
                    screamCaseToCamelCase(i.split("_").slice(2).join("_")),
                    getGlobal(i) as HandleHolder<"_enum">,
                    false,
                );
            });

            // Boolean

            abilityLevelBooleanFields.forEach((i) => {
                defineAccessor(
                    {
                        get: GetAbilityBooleanLevelField,
                        baseGet: GetAbilityBaseBooleanLevelFieldById,
                        set: SetAbilityBooleanLevelField,
                        baseSet: SetAbilityBaseBooleanLevelFieldById,
                    },
                    screamCaseToCamelCase(i.split("_").slice(2).join("_")),
                    getGlobal(i) as HandleHolder<"_enum">,
                    false,
                );
            });

            // String

            abilityLevelStringFields.forEach((i) => {
                defineAccessor(
                    {
                        get: GetAbilityStringLevelField,
                        baseGet: GetAbilityBaseStringLevelFieldById,
                        set: SetAbilityStringLevelField,
                        baseSet: SetAbilityBaseStringLevelFieldById,
                    },
                    screamCaseToCamelCase(i.split("_").slice(2).join("_")),
                    getGlobal(i) as HandleHolder<"_enum">,
                    false,
                );
            });
        }
    }
}
