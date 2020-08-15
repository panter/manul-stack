import * as Nexus from '@nexus/schema';
import { DynamicOutputPropertyDef } from '@nexus/schema/dist/dynamicProperty';
import { GraphQLFieldResolver, GraphQLScalarType } from 'graphql';
import { DmmfDocument, DmmfTypes } from './dmmf';
import { OnUnknownArgName, OnUnknownFieldName, OnUnknownFieldType, OnUnknownPrismaModelName } from './hooks';
import { ArgsNamingStrategy, FieldNamingStrategy, OperationName } from './naming-strategies';
import { PaginationStrategyTypes } from './pagination';
import { Publisher } from './publisher';
import * as Typegen from './typegen';
import { GlobalComputedInputs, Index, LocalComputedInputs } from './utils';
interface FieldPublisherConfig {
    alias?: string;
    type?: Nexus.core.AllOutputTypes;
    pagination?: boolean | Record<string, boolean>;
    filtering?: boolean | Record<string, boolean>;
    ordering?: boolean | Record<string, boolean>;
    computedInputs?: LocalComputedInputs<any>;
    resolve?: (root: object, args: object, ctx: object, info: object, originalResolve: GraphQLFieldResolver<any, any, any>) => Promise<any>;
}
declare type WithRequiredKeys<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
declare type ResolvedFieldPublisherConfig = Omit<WithRequiredKeys<FieldPublisherConfig, 'alias' | 'type'>, 'computedInputs'> & {
    locallyComputedInputs: LocalComputedInputs<any>;
};
declare type PublisherConfigData = {
    field: DmmfTypes.SchemaField;
    givenConfig?: FieldPublisherConfig;
};
declare type FieldConfigData = {
    field: DmmfTypes.SchemaField;
    publisherConfig: ResolvedFieldPublisherConfig;
    typeName: string;
    operation?: OperationName | null;
    resolve?: Nexus.FieldResolver<any, string>;
};
declare type PrismaClientFetcher = (ctx: Nexus.core.GetGen<'context'>) => any;
export interface Options {
    /**
     * nexus-prisma will call this to get a reference to an instance of the Prisma Client.
     * The function is passed the context object. Typically a Prisma Client instance will
     * be available on the context to support your custom resolvers. Therefore the
     * default getter returns `ctx.prisma`.
     */
    prismaClient?: PrismaClientFetcher;
    /**
     * Same purpose as for that used in `Nexus.makeSchema`. Follows the same rules
     * and permits the same environment variables. This configuration will completely
     * go away once Nexus has typeGen plugin support.
     */
    shouldGenerateArtifacts?: boolean;
    inputs?: {
        /**
         * Where can nexus-prisma find the Prisma Client JS package? By default looks in
         * `node_modules/@prisma/client`. This is needed because nexus-prisma
         * gets your Prisma schema AST and Prisma Client JS crud info from the generated
         * Prisma Client JS package.
         */
        prismaClient?: string;
    };
    outputs?: {
        /**
         * Where should nexus-prisma put its typegen on disk?
         *
         * @default 'node_modules/@types/typegen-nexus-plugin-prisma/index.d.ts'
         *
         * @remarks
         *
         * This configuration will completely go away once Nexus has typeGen plugin
         * support.
         *
         */
        typegen?: string;
    };
    /**
     * Select the pagination strategy.
     *
     * 'prisma' strategy results in GraphQL pagination arguments mirroring those of Prisma: skip, cursor, take
     *
     * 'relay' strategy results in GraphQL pagination arguments matching those of the [GraphQL Relay specification](https://relay.dev/graphql/connections.htm): before, after, first, last.
     *
     * @default 'relay'
     */
    paginationStrategy?: 'relay' | 'prisma';
    /**
     * Enable experimental CRUD capabilities.
     * Add a `t.crud` method in your definition block to generate CRUD resolvers in your `Query` and `Mutation` GraphQL Object Type.
     *
     * @default false
     */
    experimentalCRUD?: boolean;
    /**
     * Map of GraphQL scalar types to be used by the library for the Prisma scalars
     *
     * When not provided, the scalar types will be passthrough.
     *
     * @default {}
     */
    scalars?: Partial<Record<Typegen.GetGen<'scalars', string>, GraphQLScalarType>>;
    computedInputs?: GlobalComputedInputs;
}
export interface InternalOptions extends Options {
    dmmf?: DmmfDocument;
    nexusBuilder: Nexus.PluginBuilderLens;
    nexusPrismaImportId?: string;
    onUnknownFieldName?: OnUnknownFieldName;
    onUnknownFieldType?: OnUnknownFieldType;
    onUnknownArgName?: OnUnknownArgName;
    onUnknownPrismaModelName?: OnUnknownPrismaModelName;
    initializedByFramework?: boolean;
}
export interface InternalPublicOptions extends Omit<InternalOptions, 'nexusBuilder'> {
}
export declare function build(options: InternalOptions): {
    types: (DynamicOutputPropertyDef<"crud"> | DynamicOutputPropertyDef<"model">)[];
    wasCrudUsedButDisabled(): boolean;
};
export interface CustomInputArg {
    arg: DmmfTypes.SchemaArg;
    type: DmmfTypes.InputType | DmmfTypes.Enum | {
        name: string;
    };
}
export declare class SchemaBuilder {
    options: InternalOptions;
    readonly dmmf: DmmfDocument;
    protected argsNamingStrategy: ArgsNamingStrategy;
    protected fieldNamingStrategy: FieldNamingStrategy;
    protected paginationStrategy: PaginationStrategyTypes;
    protected getPrismaClient: PrismaClientFetcher;
    protected publisher: Publisher;
    protected scalars: Record<string, GraphQLScalarType>;
    protected globallyComputedInputs: GlobalComputedInputs;
    protected unknownFieldsByModel: Index<string[]>;
    wasCrudUsedButDisabled: boolean;
    constructor(options: InternalOptions);
    /**
     * The build entrypoint, bringing together sub-builders.
     */
    build(): (DynamicOutputPropertyDef<"crud"> | DynamicOutputPropertyDef<"model">)[];
    /**
     * Build `t.crud` dynamic output property
     */
    protected buildCRUD(): DynamicOutputPropertyDef<'crud'>;
    protected buildDisabledCRUD(): DynamicOutputPropertyDef<'crud'>;
    /**
     * Build the `t.model` dynamic output property.
     */
    protected buildModel(): DynamicOutputPropertyDef<"model">;
    protected internalBuildModel(typeName: string, t: Nexus.core.OutputDefinitionBlock<any>, stage: Nexus.core.OutputFactoryConfig<any>['stage']): any;
    buildPublisherConfig({ field, givenConfig: { computedInputs, ...otherConfig }, }: Required<PublisherConfigData>): ResolvedFieldPublisherConfig;
    buildFieldConfig(config: FieldConfigData): Nexus.core.NexusOutputFieldConfig<any, string>;
    buildArgsFromField(config: FieldConfigData): Nexus.core.ArgsRecord;
    determineArgs(config: FieldConfigData): CustomInputArg[];
    argsFromMutationField({ publisherConfig, field }: FieldConfigData): CustomInputArg[];
    protected argsFromQueryOrModelField({ typeName, field, publisherConfig }: FieldConfigData): CustomInputArg[];
    /**
     * This handles "tailored field feature publishing".
     *
     * With tailored field feature publishing, users can specify that only some
     * fields of the PSL model are exposed under the given field feature. For
     * example, in the following...
     *
     * ```ts
     * t.model.friends({ filtering: { firstName: true, location: true } })
     * ```
     *
     * ...the field feature is "filtering" and the user has tailored it so that
     * only "firstName" and "location" of the field's type (e.g. "User") are
     * exposed to filtering on this field. So the resulting GQL TypeDef would look
     * something like:
     *
     * ```ts
     * ...
     * friends(where: { firstName: ..., location: ..., }): [User]
     * ...
     * ```
     */
    protected handleInputObjectCustomization(fieldWhitelist: Record<string, boolean> | boolean, inputTypeName: string, fieldName: string, graphQLTypeName: string): DmmfTypes.InputType;
    protected assertOutputTypeIsDefined(typeName: string, fieldName: string, outputType: string, stage: 'walk' | 'build'): boolean;
    protected assertArgNameExists(parentTypeName: string, prismaOutputTypeName: string, fieldName: string, config: FieldPublisherConfig, stage: 'build' | 'walk', configProperty: 'filtering' | 'ordering'): {
        wrongArgNames: string[];
    } | true;
    protected assertFilteringOrOrderingArgNameExists(parentTypeName: string, prismaOutputTypeName: string, fieldName: string, config: FieldPublisherConfig, stage: 'build' | 'walk'): void;
}
export {};
//# sourceMappingURL=builder.d.ts.map