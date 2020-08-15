"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.relayStrategy = void 0;
const dmmf_1 = require("../dmmf");
const utils_1 = require("../utils");
const relayPaginationArgsToDmmfArgs = {
    first: () => ({
        name: 'first',
        inputType: {
            type: 'Int',
            kind: 'scalar',
            isRequired: false,
            isList: false,
            isNullable: false,
        },
    }),
    last: () => ({
        name: 'last',
        inputType: {
            type: 'Int',
            kind: 'scalar',
            isRequired: false,
            isList: false,
            isNullable: false,
        },
    }),
    before: (typeName) => ({
        name: 'before',
        inputType: {
            type: `${typeName}WhereUniqueInput`,
            kind: 'object',
            isRequired: false,
            isList: false,
            isNullable: false,
        },
    }),
    after: (typeName) => ({
        name: 'after',
        inputType: {
            type: `${typeName}WhereUniqueInput`,
            kind: 'object',
            isRequired: false,
            isList: false,
            isNullable: false,
        },
    }),
};
exports.relayStrategy = {
    paginationArgNames: utils_1.keys(relayPaginationArgsToDmmfArgs),
    transformDmmfArgs({ paginationArgNames, args, field }) {
        const fieldOutputTypeName = dmmf_1.getReturnTypeName(field.outputType.type);
        // Remove old pagination args
        args = args.filter((dmmfArg) => !paginationArgNames.includes(dmmfArg.name));
        // Push new pagination args
        args.push(relayPaginationArgsToDmmfArgs.first(fieldOutputTypeName), relayPaginationArgsToDmmfArgs.last(fieldOutputTypeName), relayPaginationArgsToDmmfArgs.before(fieldOutputTypeName), relayPaginationArgsToDmmfArgs.after(fieldOutputTypeName));
        return args;
    },
    resolve(args) {
        const { first, last, before, after } = args;
        // If no pagination set, don't touch the args
        if (!first && !last && !before && !after) {
            return args;
        }
        /**
         * This is currently only possible with js transformation on the result. eg:
         * after: 1, last: 1
         * ({
         *   cursor: { id: $before },
         *   take: Number.MAX_SAFE_INTEGER,
         *   skip: 1
         * }).slice(length - $last, length)
         */
        if (after && last) {
            throw new Error(`after and last can't be set simultaneously`);
        }
        /**
         * This is currently only possible with js transformation on the result. eg:
         * before: 4, first: 1
         * ({
         *   cursor: { id: $before },
         *   take: Number.MIN_SAFE_INTEGER,
         *   skip: 1
         * }).slice(0, $first)
         */
        if (before && first) {
            throw new Error(`before and first can't be set simultaneously`);
        }
        // Edge-case: simulates a single `before` with a hack
        if (before && !first && !last && !after) {
            return {
                cursor: before,
                skip: 1,
                take: Number.MIN_SAFE_INTEGER,
            };
        }
        const take = resolveTake(first, last);
        const cursor = resolveCursor(before, after);
        const skip = resolveSkip(cursor);
        delete args.first;
        delete args.last;
        delete args.before;
        delete args.after;
        const newArgs = Object.assign({ take,
            cursor,
            skip }, args);
        return newArgs;
    },
};
function resolveTake(first, last) {
    if (first && last) {
        throw new Error(`first and last can't be set simultaneously`);
    }
    if (first) {
        if (first < 0) {
            throw new Error(`first can't be negative`);
        }
        return first;
    }
    if (last) {
        if (last < 0) {
            throw new Error(`last can't be negative`);
        }
        if (last === 0) {
            return 0;
        }
        return last * -1;
    }
    return undefined;
}
function resolveCursor(before, after) {
    if (before && after) {
        throw new Error(`before and after can't be set simultaneously`);
    }
    return before !== null && before !== void 0 ? before : after;
}
function resolveSkip(cursor) {
    if (cursor) {
        return 1;
    }
    return undefined;
}
//# sourceMappingURL=relay.js.map