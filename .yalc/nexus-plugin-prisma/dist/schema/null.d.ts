import { DmmfDocument, DmmfTypes } from './dmmf';
/**
 * Take the incoming GraphQL args of a resolver and replaces all `null` values
 * that maps to a non-nullable field in the Prisma Schema, by `undefined` values.
 *
 * In Prisma, a `null` value has a specific meaning for the underlying database.
 * Therefore, `undefined` is used instead to express the optionality of a field.
 *
 * In GraphQL however, no difference is made between `null` and `undefined`.
 * This is the reason why we need to convert all `null` values that were assigned to `non-nullable` fields to `undefined`.
 */
export declare function transformNullsToUndefined(graphqlArgs: Record<string, any>, prismaArgs: Record<string, DmmfTypes.SchemaArg>, dmmf: DmmfDocument): Record<string, any>;
//# sourceMappingURL=null.d.ts.map