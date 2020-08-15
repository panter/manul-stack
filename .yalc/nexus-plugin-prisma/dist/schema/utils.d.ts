import { core } from '@nexus/schema';
import { GraphQLResolveInfo } from 'graphql';
/**
 * Write file contents but first delete the file off disk if present. This is a
 * useful function when the effect of file delete is needed to trigger some file
 * watch/refresh mechanism, such as is the case with VSCode TS declaration files
 * inside `@types/` packages.
 *
 * For more details that motivated this utility refer to the originating issue
 * https://github.com/graphql-nexus/nexus-plugin-prisma/issues/453.
 */
export declare const hardWriteFile: (filePath: string, data: string) => Promise<void>;
/**
 * Write file contents but first delete the file off disk if present. This is a
 * useful function when the effect of file delete is needed to trigger some file
 * watch/refresh mechanism, such as is the case with VSCode TS declaration files
 * inside `@types/` packages.
 *
 * For more details that motivated this utility refer to the originating issue
 * https://github.com/graphql-nexus/nexus-plugin-prisma/issues/453.
 */
export declare const hardWriteFileSync: (filePath: string, data: string) => void;
/**
 * TODO
 */
export declare const indexBy: <X extends Record<string, any>>(xs: X[], indexer: ((x: X) => string) | keyof X) => Record<string, X>;
export declare const upperFirst: (s: string) => string;
export declare function lowerFirst(s: string): string;
export declare function flatMap<T, U>(array: T[], callbackfn: (value: T, index: number, array: T[]) => U[]): U[];
export declare function dmmfFieldToNexusFieldConfig(param: {
    type: string | object;
    isList: boolean;
    isRequired: boolean;
}): {
    type: any;
    list: true | undefined;
    nullable: boolean;
};
export declare function assertPrismaClientInContext(prismaClient: any): void;
export declare function trimIfInNodeModules(path: string): string;
export declare function getImportPathRelativeToOutput(from: string, to: string): string;
/**
 * Index types are just an alias for Records
 * whose keys are of type `string`. The name
 * of this type, `Index`, signifies its canonical
 * use-case for data indexed by some property, e.g.
 * a list of users indexed by email.
 */
export declare type Index<T> = Record<string, T>;
/** TODO: Copy these types into computedInputs section of docs as part of
 * docs build process. The same should be done for other areas where code
 * has been copy pasted into our README.
 **/
/**
 *  Represents arguments required by Prisma Client JS that will
 *  be derived from a request's input (args, context, and info)
 *  and omitted from the GraphQL API. The object itself maps the
 *  names of these args to a function that takes an object representing
 *  the request's input and returns the value to pass to the prisma
 *  arg of the same name.
 */
export declare type LocalComputedInputs<MethodName extends string> = Record<string, (params: LocalMutationResolverParams<MethodName>) => unknown>;
export declare type GlobalComputedInputs = Record<string, (params: GlobalMutationResolverParams) => unknown>;
declare type BaseMutationResolverParams = {
    info: GraphQLResolveInfo;
    ctx: Context;
};
export declare type GlobalMutationResolverParams = BaseMutationResolverParams & {
    args: Record<string, any> & {
        data: unknown;
    };
};
export declare type LocalMutationResolverParams<MethodName extends string> = BaseMutationResolverParams & {
    args: MethodName extends keyof core.GetGen2<'argTypes', 'Mutation'> ? core.GetGen3<'argTypes', 'Mutation', MethodName> : any;
};
export declare type Context = core.GetGen<'context'>;
export declare const isEmptyObject: (o: any) => boolean;
export declare function keys<A extends object>(a: A): (keyof A)[];
export declare function ensureDepIsInstalled(depName: string): void;
export {};
//# sourceMappingURL=utils.d.ts.map