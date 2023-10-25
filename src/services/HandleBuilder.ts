import { getNativeByName, getListNatives } from "../unsafe.js";
import { Handle } from "../handles/Handle.js";
import { toHandleHolderSoft } from "../utils/ToHandleHolder.js";
import { fromHandleHolderSoft } from "../utils/FromHandleHolder.js";

type NativeFunctionType<R, A extends any[]> = ReturnType<typeof getNativeByName<R, A>>;
type AbstractNative = NativeFunctionType<any, any[]>;

type HandleConstructor = new (...args: any) => Handle;

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
}

const typeNameToTypePart = (typeName: string) => {
    return typeName.charAt(0).toLocaleUpperCase() + typeName.substring(1);
};

const toHandleHolderArgs = (args: any[]) => {
    return args.map((i) => toHandleHolderSoft(i));
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
        });
    }

    public addChainProperties(target: HandleConstructor, handleType: string) {
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
