export declare type OnUnknownFieldName = (info: {
    unknownFieldName: string;
    error: Error;
    validFieldNames: string[];
    typeName: string;
}) => void;
export declare type OnUnknownFieldType = (info: {
    unknownFieldType: string;
    error: Error;
    typeName: string;
    fieldName: string;
}) => void;
export declare type OnUnknownArgName = (info: {
    unknownArgNames: string[];
    error: Error;
    typeName: string;
    fieldName: string;
}) => void;
export declare type OnUnknownPrismaModelName = (info: {
    unknownPrismaModelName: string;
    error: Error;
}) => void;
declare type Hooks = OnUnknownFieldType | OnUnknownFieldName | OnUnknownArgName | OnUnknownPrismaModelName | undefined;
export declare function raiseErrorOrTriggerHook<T extends Hooks>(hook: T, params: Parameters<Exclude<T, undefined>>[0], message: string, stage: 'build' | 'walk'): void;
export {};
//# sourceMappingURL=hooks.d.ts.map