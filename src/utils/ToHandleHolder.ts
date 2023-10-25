import { Handle } from "../handles/Handle.js";

export function toHandleHolderSoft(value: any): HandleHolder<string> | null | undefined {
  if (value instanceof Handle) {
    return value.handle;
  }

  return value;
}