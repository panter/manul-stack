export interface ErrorArgs {
    callsite: string | undefined;
}
export interface PrintStackResult {
    stack: string;
    indent: number;
    lastErrorHeight: number;
    afterLines: string;
    fileLineNumber: string;
}
export declare const printStack: ({ callsite }: ErrorArgs) => PrintStackResult;
//# sourceMappingURL=print-stack.d.ts.map