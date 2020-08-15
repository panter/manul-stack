import { DMMF } from '@prisma/client/runtime';
import { DmmfTypes } from '../dmmf';
import { prismaStrategy } from './prisma';
import { relayStrategy } from './relay';
interface NormalizedPaginationArgs {
    cursor?: object;
    skip?: string | number;
    take?: string | number;
    orderBy?: {
        [x: string]: 'asc' | 'desc';
    };
    [x: string]: any;
}
export interface PaginationStrategy<GraphQLPaginationArgs extends object = object> {
    paginationArgNames: (keyof GraphQLPaginationArgs)[];
    transformDmmfArgs(params: {
        args: DmmfTypes.SchemaArg[];
        paginationArgNames: string[];
        field: DMMF.SchemaField;
    }): DmmfTypes.SchemaArg[];
    resolve(args: GraphQLPaginationArgs): NormalizedPaginationArgs;
}
interface PaginationStrategies {
    relay: typeof relayStrategy;
    prisma: typeof prismaStrategy;
}
export declare const paginationStrategies: PaginationStrategies;
export declare type PaginationStrategyTypes = typeof relayStrategy | typeof prismaStrategy;
export {};
//# sourceMappingURL=index.d.ts.map