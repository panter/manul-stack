"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaStrategy = void 0;
const dmmf_1 = require("../dmmf");
const utils_1 = require("../utils");
const prismaPaginationArgsToDmmfArgs = {
    take: () => ({
        name: 'take',
        inputType: {
            type: 'Int',
            kind: 'scalar',
            isRequired: false,
            isList: false,
            isNullable: false,
        },
    }),
    skip: () => ({
        name: 'skip',
        inputType: {
            type: 'Int',
            kind: 'scalar',
            isRequired: false,
            isList: false,
            isNullable: false,
        },
    }),
    cursor: (typeName) => ({
        name: 'cursor',
        inputType: {
            type: `${typeName}WhereUniqueInput`,
            kind: 'object',
            isRequired: false,
            isList: false,
            isNullable: false,
        },
    }),
};
exports.prismaStrategy = {
    paginationArgNames: utils_1.keys(prismaPaginationArgsToDmmfArgs),
    transformDmmfArgs({ paginationArgNames, args, field }) {
        const fieldOutputTypeName = dmmf_1.getReturnTypeName(field.outputType.type);
        // Remove old pagination args
        args = args.filter((dmmfArg) => !paginationArgNames.includes(dmmfArg.name));
        // Push new pagination args
        args.push(prismaPaginationArgsToDmmfArgs.take(fieldOutputTypeName), prismaPaginationArgsToDmmfArgs.skip(fieldOutputTypeName), prismaPaginationArgsToDmmfArgs.cursor(fieldOutputTypeName));
        return args;
    },
    resolve(args) {
        return args;
    },
};
//# sourceMappingURL=prisma.js.map