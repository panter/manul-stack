"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCrudMappedFields = void 0;
const naming_strategies_1 = require("./naming-strategies");
const utils_1 = require("./utils");
const buildField = (mapping, operation) => {
    if (mapping[operation] === undefined) {
        return null;
    }
    return {
        operation,
        field: mapping[operation],
        model: mapping.model,
        prismaClientAccessor: utils_1.lowerFirst(mapping.model),
    };
};
const CRUD_MAPPED_FIELDS = {
    Query: (m) => [buildField(m, 'findOne'), buildField(m, 'findMany')],
    Mutation: (m) => [
        buildField(m, 'create'),
        buildField(m, 'update'),
        buildField(m, 'updateMany'),
        buildField(m, 'delete'),
        buildField(m, 'deleteMany'),
        buildField(m, 'upsert'),
    ],
};
exports.getCrudMappedFields = (typeName, dmmf, namingStrategy = naming_strategies_1.defaultFieldNamingStrategy) => {
    const mappedFields = utils_1.flatMap(dmmf.mappings, (m) => CRUD_MAPPED_FIELDS[typeName](m)).filter((mappedField) => mappedField !== null);
    return mappedFields.map((mappedField) => (Object.assign(Object.assign({}, mappedField), { field: Object.assign(Object.assign({}, dmmf.getOutputType(typeName).getField(mappedField.field)), { name: namingStrategy[mappedField.operation](mappedField.field, mappedField.model) }) })));
};
//# sourceMappingURL=mapping.js.map