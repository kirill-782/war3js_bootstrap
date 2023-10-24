import { getNativeByName, getListNatives } from "../unsafe.js";
import { Handle } from "../handles/Handle.js";

type NativeFunctionType<R, A extends any[]> = ReturnType<typeof getNativeByName<R, A>>;
type AbstractNative = NativeFunctionType<any, any[]>;

type HandleConstructor = new (...args: any) => Handle;

interface NativeMeta {
  native: AbstractNative;
  useCount: number;
}

interface ChainPropertyMeta {
  getterNative: AbstractNative;
  setterNative: AbstractNative;
  name: string;
}

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

  public addChainProperty(target: HandleConstructor, handleType: string) {
    const typePart = handleType.charAt(0).toLocaleUpperCase() + handleType.substring(1);

    const properties = new Array<ChainPropertyMeta>();

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

    properties.forEach((property) => {
      target.prototype[property.name] = function (this: Handle, value?: any) {
        if (value === undefined) return property.getterNative(this.handle);

        property.setterNative(this.handle, value);

        return this;
      };
    });
  }
}
