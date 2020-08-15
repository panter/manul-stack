import { DmmfDocument, DmmfTypes } from './dmmf';
import { FieldNamingStrategy, OperationName } from './naming-strategies';
interface BaseMappedField {
    field: string;
    operation: OperationName;
    model: string;
    prismaClientAccessor: string;
}
export interface MappedField extends Omit<BaseMappedField, 'field'> {
    field: DmmfTypes.SchemaField;
}
export declare const getCrudMappedFields: (typeName: 'Query' | 'Mutation', dmmf: DmmfDocument, namingStrategy?: FieldNamingStrategy) => MappedField[];
export {};
//# sourceMappingURL=mapping.d.ts.map