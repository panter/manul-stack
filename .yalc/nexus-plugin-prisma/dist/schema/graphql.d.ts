export declare type RootName = 'Query' | 'Mutation' | 'Subscription';
export declare const rootNames: {
    readonly Query: "Query";
    readonly Mutation: "Mutation";
    readonly Subscription: "Subscription";
};
export declare const rootNameValues: RootName[];
export declare const isRootName: (x: any) => x is RootName;
export declare type ScalarName = 'Int' | 'Float' | 'String' | 'ID' | 'Boolean';
export declare const scalarsNameValues: ScalarName[];
export declare const isScalarType: (name: string) => boolean;
//# sourceMappingURL=graphql.d.ts.map