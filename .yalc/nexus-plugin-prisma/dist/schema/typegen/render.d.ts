import { DmmfDocument } from '../dmmf';
import { PaginationStrategy } from '../pagination';
declare type Options = {
    prismaClientPath: string;
    typegenPath: string;
    paginationStrategy: PaginationStrategy;
    nexusPrismaImportId?: string;
};
export declare function generateSync(options: Options): void;
export declare function generate(options: Options): Promise<void>;
export declare function doGenerate(sync: true, options: Options): void;
export declare function doGenerate(sync: false, options: Options): Promise<void>;
export declare function render(params: {
    dmmf: DmmfDocument;
    prismaClientImportId: string;
    nexusPrismaImportId?: string;
    paginationStrategy: PaginationStrategy;
}): string;
export {};
//# sourceMappingURL=render.d.ts.map