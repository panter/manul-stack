import * as Nexus from '@nexus/schema';
import { OnUnknownFieldName, OnUnknownPrismaModelName } from './hooks';
import { Index } from './utils';
export declare function proxifyPublishers<T extends object>(publishers: T, typeName: string, stage: Nexus.core.OutputFactoryConfig<any>['stage'], onUnknownFieldName: OnUnknownFieldName | undefined): any;
export declare function proxifyModelFunction(modelFunc: (modelName: string) => any, modelName: string, stage: Nexus.core.OutputFactoryConfig<any>['stage'], onUnknownPrismaModelName: OnUnknownPrismaModelName | undefined, unknownFieldsByModel: Index<string[]>): (modelName: string) => any;
//# sourceMappingURL=proxifier.d.ts.map