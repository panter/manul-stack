"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformNullsToUndefined = void 0;
const Lo = __importStar(require("lodash"));
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
function transformNullsToUndefined(graphqlArgs, prismaArgs, dmmf) {
    const keys = Object.keys(graphqlArgs);
    for (const key of keys) {
        const val = graphqlArgs[key];
        const prismaArg = prismaArgs[key];
        if (!prismaArg) {
            throw new Error(`Could not find schema arg with name: ${key}`);
        }
        const shouldConvertNullToUndefined = val === null && prismaArg.inputType.isNullable === false;
        if (shouldConvertNullToUndefined) {
            graphqlArgs[key] = undefined;
        }
        else if (Lo.isPlainObject(val)) {
            const nestedPrismaArgs = dmmf.getInputTypeWithIndexedFields(prismaArg.inputType.type).fields;
            graphqlArgs[key] = transformNullsToUndefined(graphqlArgs[key], nestedPrismaArgs, dmmf);
        }
    }
    return graphqlArgs;
}
exports.transformNullsToUndefined = transformNullsToUndefined;
//# sourceMappingURL=null.js.map