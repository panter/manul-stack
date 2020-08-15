import * as Nexus from '@nexus/schema';
import { CustomInputArg } from './builder';
import { DmmfDocument, DmmfTypes } from './dmmf';
import { Index } from './utils';
import { GraphQLScalarType } from 'graphql';
export declare class Publisher {
    dmmf: DmmfDocument;
    nexusBuilder: Nexus.PluginBuilderLens;
    scalars: Record<string, GraphQLScalarType>;
    typesPublished: Index<boolean>;
    constructor(dmmf: DmmfDocument, nexusBuilder: Nexus.PluginBuilderLens, scalars: Record<string, GraphQLScalarType>);
    inputType(customArg: CustomInputArg): string | Nexus.core.NexusInputObjectTypeDef<string> | Nexus.core.NexusEnumTypeDef<string> | Nexus.core.NexusScalarTypeDef<string> | Nexus.core.NexusArgDef<any> | GraphQLScalarType;
    outputType(outputTypeName: string, field: DmmfTypes.SchemaField): any;
    protected publishObject(name: string): Nexus.core.NexusObjectTypeDef<string>;
    protected publishScalar(typeName: string): string | GraphQLScalarType | Nexus.core.NexusScalarTypeDef<string>;
    protected publishEnum(typeName: string): Nexus.core.NexusEnumTypeDef<string>;
    publishInputObjectType(inputType: DmmfTypes.InputType): Nexus.core.NexusInputObjectTypeDef<string>;
    protected getTypeFromArg(arg: DmmfTypes.SchemaArg): CustomInputArg['type'];
    isPublished(typeName: string): boolean;
    markTypeAsPublished(typeName: string): void;
}
//# sourceMappingURL=publisher.d.ts.map