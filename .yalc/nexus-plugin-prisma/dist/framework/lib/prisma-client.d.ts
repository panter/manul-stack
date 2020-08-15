import { PrismaClient } from '@prisma/client';
import { RuntimeLens } from 'nexus/plugin';
import { Settings } from '../settings';
export declare function getPrismaClientInstance(clientOrOptions: Settings['client'], log: RuntimeLens['log']): PrismaClient<import("@prisma/client").PrismaClientOptions, never>;
export declare function getPrismaClientDir(): string;
//# sourceMappingURL=prisma-client.d.ts.map