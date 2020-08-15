import { DmmfDocument } from './dmmf';
/**
 * Find the unique identifiers necessary to indentify a field
 *
 * Unique fields for a model can be one of (in this order):
 * 1. One (and only one) field with an @id annotation
 * 2. Multiple fields with @@id clause
 * 3. One (and only one) field with a @unique annotation (if there are multiple, use the first one)
 * 4. Multiple fields with a @@unique clause
 */
export declare function resolveUniqueIdentifiers(typeName: string, dmmf: DmmfDocument): string[];
export declare function findMissingUniqueIdentifiers(data: Record<string, any>, uniqueIdentifiers: string[]): string[] | null;
export declare function buildWhereUniqueInput(data: Record<string, any>, uniqueIdentifiers: string[]): Record<string, any>;
//# sourceMappingURL=constraints.d.ts.map