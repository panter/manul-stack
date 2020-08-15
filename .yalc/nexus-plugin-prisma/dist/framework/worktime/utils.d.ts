import * as Prisma from '@prisma/sdk';
import { WorktimeLens } from 'nexus/plugin';
/**
 * Pinned query-engine version. Calculated at build time and based on `@prisma/cli` version
 */
export declare const PRISMA_QUERY_ENGINE_VERSION: string;
/**
 * Get the declared generator blocks in the user's PSL file.
 *
 * If Prisma SDK throws a no-models-found error then it is caught, a model is
 * scaffolded, and this function is re-run.
 */
export declare function getGenerators(nexus: WorktimeLens, schemaPath: string): Promise<Prisma.Generator[]>;
//# sourceMappingURL=utils.d.ts.map