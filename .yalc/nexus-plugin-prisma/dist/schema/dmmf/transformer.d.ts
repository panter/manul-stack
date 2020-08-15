import { DMMF } from '@prisma/client/runtime';
import { PaginationStrategy } from '../pagination';
import { GlobalComputedInputs, GlobalMutationResolverParams, LocalComputedInputs } from '../utils';
import { DmmfDocument } from './DmmfDocument';
import { DmmfTypes } from './DmmfTypes';
export declare type TransformOptions = {
    globallyComputedInputs?: GlobalComputedInputs;
    paginationStrategy?: PaginationStrategy;
};
export declare const getTransformedDmmf: (prismaClientPackagePath: string, options?: TransformOptions | undefined) => DmmfDocument;
export declare function transform(document: DMMF.Document, options?: TransformOptions): DmmfTypes.Document;
declare type AddComputedInputParams = {
    inputType: DmmfTypes.InputType;
    params: GlobalMutationResolverParams;
    dmmf: DmmfDocument;
    locallyComputedInputs: LocalComputedInputs<any>;
};
export declare function addComputedInputs({ dmmf, inputType, locallyComputedInputs, params, }: AddComputedInputParams): Promise<{
    data: {
        [x: string]: any;
    };
}>;
/**
 * Make the "return type" property type always be a string. In Prisma Client
 * it is allowed to be a nested structured object but we want only the
 * reference-by-name form.
 *
 */
export declare function getReturnTypeName(type: any): string;
export {};
//# sourceMappingURL=transformer.d.ts.map