import { DmmfTypes } from './DmmfTypes';
import { Index } from '../utils';
export declare class DmmfDocument implements DmmfTypes.Document {
    datamodel: DmmfTypes.Datamodel;
    schema: DmmfTypes.Schema;
    mappings: DmmfTypes.Mapping[];
    queryObject: OutputType;
    mutationObject: OutputType;
    outputTypesIndex: Index<DmmfTypes.OutputType>;
    inputTypesIndex: Index<DmmfTypes.InputType>;
    mappingsIndex: Index<DmmfTypes.Mapping>;
    enumsIndex: Index<DmmfTypes.Enum>;
    modelsIndex: Index<DmmfTypes.Model>;
    inputTypesIndexWithFields: InputTypeIndexWithField;
    customScalars: Array<string>;
    constructor({ datamodel, schema, mappings }: DmmfTypes.Document);
    getInputType(inputTypeName: string): DmmfTypes.InputType;
    getInputTypeWithIndexedFields(inputTypeName: string): Pick<DmmfTypes.InputType, "name" | "atMostOne" | "atLeastOne" | "isWhereType" | "isOrderType" | "computedInputs"> & {
        fields: Record<string, DmmfTypes.SchemaArg>;
    };
    getOutputType(outputTypeName: string): OutputType;
    hasOutputType(outputTypeName: string): boolean;
    getEnumType(enumTypeName: string): DmmfTypes.Enum;
    hasEnumType(enumTypeName: string): boolean;
    getModelOrThrow(modelName: string): DmmfTypes.Model;
    hasModel(modelName: string): boolean;
    getMapping(modelName: string): DmmfTypes.Mapping;
}
export declare class OutputType {
    protected outputType: DmmfTypes.OutputType;
    name: string;
    fields: DmmfTypes.SchemaField[];
    isEmbedded?: boolean;
    constructor(outputType: DmmfTypes.OutputType);
    getField(fieldName: string): DmmfTypes.SchemaField;
}
declare type InputTypeIndexWithField = Index<Omit<DmmfTypes.InputType, 'fields'> & {
    fields: Index<DmmfTypes.SchemaArg>;
}>;
export {};
//# sourceMappingURL=DmmfDocument.d.ts.map