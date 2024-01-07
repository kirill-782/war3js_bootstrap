export const isNode = "process" in globalThis && (globalThis as any)?.process?.versions?.node;
