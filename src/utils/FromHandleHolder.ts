export function fromHandleHolderSoft(arg: any) {
    if (arg instanceof HandleHolder) return arg.payload || arg;

    return arg;
}
