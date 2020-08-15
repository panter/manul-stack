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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaBuilder = exports.build = void 0;
const Nexus = __importStar(require("@nexus/schema"));
const graphql_1 = require("graphql");
const path = __importStar(require("path"));
const Constraints = __importStar(require("./constraints"));
const dmmf_1 = require("./dmmf");
const GraphQL = __importStar(require("./graphql"));
const hooks_1 = require("./hooks");
const mapping_1 = require("./mapping");
const naming_strategies_1 = require("./naming-strategies");
const null_1 = require("./null");
const pagination_1 = require("./pagination");
const proxifier_1 = require("./proxifier");
const publisher_1 = require("./publisher");
const Typegen = __importStar(require("./typegen"));
const utils_1 = require("./utils");
/**
 * When dealing with list types we rely on the list type zero value (empty-list)
 * to represent the idea of null.
 *
 * For Prisma Client JS' part, it will never return null for list type fields nor will it
 * ever return null value list members.
 */
const dmmfListFieldTypeToNexus = (fieldType) => {
    return fieldType.isList
        ? {
            list: [true],
            nullable: false,
        }
        : {
            nullable: !fieldType.isRequired,
        };
};
function build(options) {
    const builder = new SchemaBuilder(options);
    return {
        types: builder.build(),
        wasCrudUsedButDisabled() {
            return builder.wasCrudUsedButDisabled;
        },
    };
}
exports.build = build;
// The @types default is based on the privileged given to such
// packages by TypeScript. For details refer to https://www.typescriptlang.org/docs/handbook/tsconfig-json.html#types-typeroots-and-types
let defaultTypegenPath;
if (process.env.NEXUS_PRISMA_TYPEGEN_PATH) {
    defaultTypegenPath = process.env.NEXUS_PRISMA_TYPEGEN_PATH;
}
else if (process.env.LINK) {
    defaultTypegenPath = path.join(process.cwd(), 'node_modules/@types/typegen-nexus-plugin-prisma/index.d.ts');
}
else {
    defaultTypegenPath = path.join(__dirname, '../../../@types/typegen-nexus-plugin-prisma/index.d.ts');
}
let defaultClientPath;
if (process.env.NEXUS_PRISMA_CLIENT_PATH) {
    defaultClientPath = process.env.NEXUS_PRISMA_CLIENT_PATH;
}
else if (process.env.LINK) {
    defaultClientPath = path.join(process.cwd(), '/node_modules/@prisma/client');
}
else {
    defaultClientPath = '@prisma/client';
}
// NOTE This will be replaced by Nexus plugins once typegen integration is available.
const shouldGenerateArtifacts = process.env.NEXUS_SHOULD_GENERATE_ARTIFACTS === 'true'
    ? true
    : process.env.NEXUS_SHOULD_GENERATE_ARTIFACTS === 'false'
        ? false
        : Boolean(!process.env.NODE_ENV || process.env.NODE_ENV === 'development');
const defaultOptions = {
    shouldGenerateArtifacts,
    prismaClient: (ctx) => ctx.prisma,
    paginationStrategy: 'relay',
    inputs: {
        prismaClient: defaultClientPath,
    },
    outputs: {
        typegen: defaultTypegenPath,
    },
    computedInputs: {},
};
class SchemaBuilder {
    constructor(options) {
        var _a;
        this.options = options;
        const config = Object.assign(Object.assign(Object.assign({}, defaultOptions), options), { inputs: Object.assign(Object.assign({}, defaultOptions.inputs), options.inputs), outputs: Object.assign(Object.assign({}, defaultOptions.outputs), options.outputs) });
        // Internally rename the 'computedInputs' plugin option to clarify scope
        this.globallyComputedInputs = config.computedInputs ? config.computedInputs : {};
        this.paginationStrategy = pagination_1.paginationStrategies[config.paginationStrategy];
        this.dmmf =
            options.dmmf ||
                dmmf_1.getTransformedDmmf(config.inputs.prismaClient, {
                    globallyComputedInputs: this.globallyComputedInputs,
                    paginationStrategy: this.paginationStrategy,
                });
        this.scalars = (_a = options.scalars) !== null && _a !== void 0 ? _a : {};
        this.publisher = new publisher_1.Publisher(this.dmmf, config.nexusBuilder, this.scalars);
        this.unknownFieldsByModel = {};
        this.argsNamingStrategy = naming_strategies_1.defaultArgsNamingStrategy;
        this.fieldNamingStrategy = naming_strategies_1.defaultFieldNamingStrategy;
        this.wasCrudUsedButDisabled = false;
        this.getPrismaClient = (ctx) => {
            const prismaClient = config.prismaClient(ctx);
            utils_1.assertPrismaClientInContext(prismaClient);
            return prismaClient;
        };
        if (config.shouldGenerateArtifacts) {
            Typegen.generateSync({
                prismaClientPath: config.inputs.prismaClient,
                typegenPath: config.outputs.typegen,
                paginationStrategy: this.paginationStrategy,
                nexusPrismaImportId: options.nexusPrismaImportId,
            });
        }
    }
    /**
     * The build entrypoint, bringing together sub-builders.
     */
    build() {
        if (this.options.experimentalCRUD === true) {
            return [this.buildCRUD(), this.buildModel()];
        }
        return [this.buildModel(), this.buildDisabledCRUD()];
    }
    /**
     * Build `t.crud` dynamic output property
     */
    buildCRUD() {
        return Nexus.dynamicOutputProperty({
            name: 'crud',
            typeDefinition: `: NexusPrisma<TypeName, 'crud'>`,
            // FIXME
            // Nexus should improve the type of typeName to be AllOutputTypes
            factory: ({ typeDef: t, typeName, stage }) => {
                if (typeName === GraphQL.rootNames.Subscription) {
                    // TODO Lets put a GitHub issue link in this error message
                    throw new Error(`t.crud is not yet supported on the 'Subscription' type.`);
                }
                if (typeName !== GraphQL.rootNames.Query && typeName !== GraphQL.rootNames.Mutation) {
                    throw new Error(`t.crud can only be used on GraphQL root types 'Query' & 'Mutation' but was used on '${typeName}'. Please use 't.model' instead`);
                }
                const publishers = mapping_1.getCrudMappedFields(typeName, this.dmmf).reduce((crud, mappedField) => {
                    const fieldPublisher = (givenConfig) => {
                        const inputType = this.dmmf.getInputType(mappedField.field.args[0].inputType.type);
                        const publisherConfig = this.buildPublisherConfig({
                            field: mappedField.field,
                            givenConfig: givenConfig ? givenConfig : {},
                        });
                        const schemaArgsIndex = utils_1.indexBy(mappedField.field.args, 'name');
                        const originalResolve = (_root, args, ctx, info) => __awaiter(this, void 0, void 0, function* () {
                            const prismaClient = this.getPrismaClient(ctx);
                            args = null_1.transformNullsToUndefined(args, schemaArgsIndex, this.dmmf);
                            if (typeName === 'Mutation' &&
                                (!utils_1.isEmptyObject(publisherConfig.locallyComputedInputs) ||
                                    !utils_1.isEmptyObject(this.globallyComputedInputs))) {
                                args = yield dmmf_1.addComputedInputs({
                                    inputType,
                                    dmmf: this.dmmf,
                                    params: {
                                        info,
                                        args,
                                        ctx,
                                    },
                                    locallyComputedInputs: publisherConfig.locallyComputedInputs,
                                });
                            }
                            args = this.paginationStrategy.resolve(args);
                            return prismaClient[mappedField.prismaClientAccessor][mappedField.operation](args);
                        });
                        const fieldConfig = this.buildFieldConfig({
                            field: mappedField.field,
                            publisherConfig,
                            typeName,
                            operation: mappedField.operation,
                            resolve: (root, args, ctx, info) => {
                                return (givenConfig === null || givenConfig === void 0 ? void 0 : givenConfig.resolve) ? givenConfig.resolve(root, args, ctx, info, originalResolve)
                                    : originalResolve(root, args, ctx, info);
                            },
                        });
                        if (this.assertOutputTypeIsDefined(typeName, mappedField.field.name, publisherConfig.type, stage)) {
                            t.field(publisherConfig.alias, fieldConfig);
                        }
                        this.assertFilteringOrOrderingArgNameExists(typeName, mappedField.field.outputType.type, mappedField.field.name, publisherConfig, stage);
                        return crud;
                    };
                    crud[mappedField.field.name] = fieldPublisher;
                    return crud;
                }, {});
                return proxifier_1.proxifyPublishers(publishers, typeName, stage, this.options.onUnknownFieldName);
            },
        });
    }
    buildDisabledCRUD() {
        return Nexus.dynamicOutputProperty({
            name: 'crud',
            factory: () => {
                this.wasCrudUsedButDisabled = true;
                return new Proxy({}, {
                    get() {
                        return () => { };
                    },
                });
            },
        });
    }
    /**
     * Build the `t.model` dynamic output property.
     */
    buildModel() {
        return Nexus.dynamicOutputProperty({
            name: 'model',
            typeDefinition: `: NexusPrisma<TypeName, 'model'>`,
            /**
             * This factory implements what .model will actually be.
             *
             * If the user's GQL typedef name matches a PSL model name,
             * then we infer that the user is trying to create a mapping
             * between them. This is the implicit mapping case.
             *
             * Otherwise we need the user to specify what PSL model
             * their GQL object maps to. This is the explicit mapping case.
             *
             * In the implicit case we eagerly do the .model implementation,
             * but in the explicit case we return a function in order that the
             * user may specify the mapping.
             *
             * Examples:
             *
             *    // Given PSL that contains:
             *
             *    model User {
             *      id    String @unique @id @default(uuid())
             *      email String @unique
             *    }
             *
             *    // Example of implicit mapping
             *
             *    objectType({
             *      name: 'User',
             *      definition(t) {
             *        t.model.id()
             *        t.model.email()
             *      }
             *    })
             *
             *    // Example of explicit mapping
             *
             *    objectType({
             *      name: 'Customer',
             *      definition(t) {
             *        t.model('User').id()
             *        t.model('User').email()
             *      }
             *    })
             *
             */
            factory: ({ typeDef, typeName, stage }) => {
                const hasPrismaModel = this.dmmf.hasModel(typeName);
                if (hasPrismaModel) {
                    return this.internalBuildModel(typeName, typeDef, stage);
                }
                else {
                    const accessor = (modelName) => this.internalBuildModel(modelName, typeDef, stage);
                    return proxifier_1.proxifyModelFunction(accessor, typeName, stage, this.options.onUnknownPrismaModelName, this.unknownFieldsByModel);
                }
            },
        });
    }
    internalBuildModel(typeName, t, stage) {
        const model = this.dmmf.getModelOrThrow(typeName);
        const outputType = this.dmmf.getOutputType(model.name);
        const publishers = outputType.fields.reduce((acc, field) => {
            const fieldPublisher = (givenConfig) => {
                const publisherConfig = this.buildPublisherConfig({
                    field,
                    givenConfig: givenConfig !== null && givenConfig !== void 0 ? givenConfig : {},
                });
                if (!this.assertOutputTypeIsDefined(typeName, publisherConfig.alias, publisherConfig.type, stage)) {
                    return acc;
                }
                this.assertFilteringOrOrderingArgNameExists(typeName, field.outputType.type, publisherConfig.alias, publisherConfig, stage);
                const mapping = this.dmmf.getMapping(typeName);
                const uniqueIdentifiers = Constraints.resolveUniqueIdentifiers(typeName, this.dmmf);
                const schemaArgsIndex = utils_1.indexBy(field.args, 'name');
                const originalResolve = field.outputType.kind === 'object'
                    ? (root, args, ctx) => {
                        const missingIdentifiers = Constraints.findMissingUniqueIdentifiers(root, uniqueIdentifiers);
                        if (missingIdentifiers !== null) {
                            throw new Error(`Resolver ${typeName}.${publisherConfig.alias} is missing the following unique identifiers: ${missingIdentifiers.join(', ')}`);
                        }
                        const prismaClient = this.getPrismaClient(ctx);
                        args = null_1.transformNullsToUndefined(args, schemaArgsIndex, this.dmmf);
                        args = this.paginationStrategy.resolve(args);
                        return prismaClient[utils_1.lowerFirst(mapping.model)]
                            .findOne({
                            where: Constraints.buildWhereUniqueInput(root, uniqueIdentifiers),
                        })[field.name](args);
                    }
                    : publisherConfig.alias != field.name
                        ? (root) => root[field.name]
                        : undefined;
                const fieldConfig = this.buildFieldConfig({
                    field,
                    publisherConfig,
                    typeName,
                    resolve: (givenConfig === null || givenConfig === void 0 ? void 0 : givenConfig.resolve) ? (root, args, ctx, info) => {
                        return givenConfig.resolve(root, args, ctx, info, originalResolve !== null && originalResolve !== void 0 ? originalResolve : graphql_1.defaultFieldResolver);
                    }
                        : originalResolve,
                });
                t.field(publisherConfig.alias, fieldConfig);
                return publishers;
            };
            acc[field.name] = fieldPublisher;
            return acc;
        }, {});
        return proxifier_1.proxifyPublishers(publishers, typeName, stage, this.options.onUnknownFieldName);
    }
    buildPublisherConfig(_a) {
        var { field } = _a, _b = _a.givenConfig, { computedInputs } = _b, otherConfig = __rest(_b, ["computedInputs"]);
        return Object.assign({ pagination: true, type: field.outputType.type, alias: field.name, locallyComputedInputs: computedInputs ? computedInputs : {} }, otherConfig);
    }
    buildFieldConfig(config) {
        const _a = config.publisherConfig, { alias, locallyComputedInputs, type, filtering, ordering, pagination } = _a, additionalExternalPropsSuchAsPlugins = __rest(_a, ["alias", "locallyComputedInputs", "type", "filtering", "ordering", "pagination"]);
        return Object.assign(Object.assign(Object.assign(Object.assign({}, additionalExternalPropsSuchAsPlugins), { type: this.publisher.outputType(config.publisherConfig.type, config.field) }), dmmfListFieldTypeToNexus(config.field.outputType)), { args: this.buildArgsFromField(config), resolve: config.resolve });
    }
    buildArgsFromField(config) {
        return this.determineArgs(config).reduce((acc, customArg) => (Object.assign(Object.assign({}, acc), { [customArg.arg.name]: this.publisher.inputType(customArg) })), {});
    }
    determineArgs(config) {
        if (config.typeName === 'Mutation') {
            return this.argsFromMutationField(config);
        }
        else if (config.operation === 'findOne') {
            return config.field.args.map((arg) => ({
                arg,
                type: this.dmmf.getInputType(arg.inputType.type),
            }));
        }
        else {
            return this.argsFromQueryOrModelField(config);
        }
    }
    argsFromMutationField({ publisherConfig, field }) {
        return field.args.map((arg) => {
            const prismaClientInputType = this.dmmf.getInputType(arg.inputType.type);
            /*
            Since globallyComputedInputs were already filtered during schema transformation,
            at this point we just need to filter at the resolver-level.
            */
            return {
                arg,
                type: Object.assign(Object.assign({}, prismaClientInputType), { fields: publisherConfig.locallyComputedInputs
                        ? prismaClientInputType.fields.filter((field) => !(field.name in publisherConfig.locallyComputedInputs))
                        : prismaClientInputType.fields }),
            };
        });
    }
    argsFromQueryOrModelField({ typeName, field, publisherConfig }) {
        let args = [];
        if (publisherConfig.filtering) {
            const inputObjectTypeDefName = `${field.outputType.type}WhereInput`;
            const whereArg = field.args.find((arg) => arg.inputType.type === inputObjectTypeDefName && arg.name === 'where');
            if (!whereArg) {
                throw new Error(`Could not find filtering argument for ${typeName}.${field.name}`);
            }
            const inputType = this.handleInputObjectCustomization(publisherConfig.filtering, inputObjectTypeDefName, field.name, typeName);
            if (inputType.fields.length > 0) {
                args.push({
                    arg: whereArg,
                    type: inputType,
                });
            }
        }
        if (publisherConfig.ordering) {
            const orderByTypeName = `${field.outputType.type}OrderByInput`;
            const orderByArg = field.args.find((arg) => arg.inputType.type === orderByTypeName && arg.name === 'orderBy');
            if (!orderByArg) {
                throw new Error(`Could not find ordering argument for ${typeName}.${field.name}`);
            }
            const inputType = this.handleInputObjectCustomization(publisherConfig.ordering, orderByTypeName, field.name, typeName);
            if (inputType.fields.length > 0) {
                args.push({
                    arg: orderByArg,
                    type: inputType,
                });
            }
        }
        if (publisherConfig.pagination) {
            const paginationsArgs = publisherConfig.pagination === true
                ? field.args.filter((a) => {
                    const argNames = this.paginationStrategy.paginationArgNames;
                    return argNames.includes(a.name);
                })
                : field.args.filter((arg) => {
                    return publisherConfig.pagination[arg.name] === true;
                });
            args.push(...paginationsArgs.map((a) => {
                if (a.inputType.kind === 'scalar' || a.inputType.kind === 'enum') {
                    return {
                        arg: a,
                        type: { name: a.inputType.type },
                    };
                }
                else {
                    return {
                        arg: a,
                        type: this.dmmf.inputTypesIndex[a.inputType.type],
                    };
                }
            }));
        }
        return args;
    }
    /**
     * This handles "tailored field feature publishing".
     *
     * With tailored field feature publishing, users can specify that only some
     * fields of the PSL model are exposed under the given field feature. For
     * example, in the following...
     *
     * ```ts
     * t.model.friends({ filtering: { firstName: true, location: true } })
     * ```
     *
     * ...the field feature is "filtering" and the user has tailored it so that
     * only "firstName" and "location" of the field's type (e.g. "User") are
     * exposed to filtering on this field. So the resulting GQL TypeDef would look
     * something like:
     *
     * ```ts
     * ...
     * friends(where: { firstName: ..., location: ..., }): [User]
     * ...
     * ```
     */
    handleInputObjectCustomization(fieldWhitelist, inputTypeName, fieldName, graphQLTypeName) {
        const prismaClientObject = this.dmmf.getInputType(inputTypeName);
        // If the publishing for this field feature (filtering, ordering, ...)
        // has not been tailored then we may simply pass through the backing
        // version as-is.
        //
        if (fieldWhitelist === true) {
            return prismaClientObject;
        }
        // REFACTOR use an intersection function
        const whitelistedFieldNames = Object.keys(fieldWhitelist);
        const userExposedObjectFields = prismaClientObject.fields.filter((field) => whitelistedFieldNames.includes(field.name));
        const uniqueName = prismaClientObject.isWhereType
            ? this.argsNamingStrategy.whereInput(graphQLTypeName, fieldName)
            : this.argsNamingStrategy.orderByInput(graphQLTypeName, fieldName);
        return Object.assign(Object.assign({}, prismaClientObject), { name: uniqueName, fields: userExposedObjectFields });
    }
    assertOutputTypeIsDefined(typeName, fieldName, outputType, stage) {
        if (this.options.nexusBuilder.hasType(outputType) ||
            GraphQL.isScalarType(outputType) || // scalar types are auto-published
            !this.dmmf.hasModel(outputType) // output types that are not models are auto-published
        ) {
            return true;
        }
        const message = `Your GraphQL \`${typeName}\` object definition is projecting a field \`${fieldName}\` with \`${outputType}\` as output type, but \`${outputType}\` is not defined in your GraphQL Schema`;
        hooks_1.raiseErrorOrTriggerHook(this.options.onUnknownFieldType, {
            unknownFieldType: outputType,
            typeName,
            fieldName,
            error: new Error(message),
        }, message, stage);
        return false;
    }
    assertArgNameExists(parentTypeName, prismaOutputTypeName, fieldName, config, stage, configProperty) {
        if (!config[configProperty] || config[configProperty] === true) {
            return true;
        }
        const argNames = Object.keys(config[configProperty]);
        const typeNameFieldNames = this.dmmf.getModelOrThrow(prismaOutputTypeName).fields.map((f) => f.name);
        const wrongArgNames = argNames.filter((filteringFieldName) => !typeNameFieldNames.includes(filteringFieldName));
        if (wrongArgNames.length === 0) {
            return true;
        }
        const actionWord = configProperty === 'filtering' ? 'filter' : 'order';
        const renderMessage = (argName) => `Your GraphQL \`${parentTypeName}\` object definition is projecting a relational field \`${fieldName}\`. On it, you are declaring that clients be able to ${actionWord} by Prisma \`${prismaOutputTypeName}\` model field \`${argName}\`. However, your Prisma model \`${prismaOutputTypeName}\` model has no such field \`${argName}\``;
        const message = wrongArgNames.map((argName) => renderMessage(argName)).join('\n');
        hooks_1.raiseErrorOrTriggerHook(this.options.onUnknownArgName, {
            unknownArgNames: wrongArgNames,
            typeName: prismaOutputTypeName,
            fieldName,
            error: new Error(message),
        }, message, stage);
        return { wrongArgNames };
    }
    assertFilteringOrOrderingArgNameExists(parentTypeName, prismaOutputTypeName, fieldName, config, stage) {
        this.assertArgNameExists(parentTypeName, prismaOutputTypeName, fieldName, config, stage, 'filtering');
        this.assertArgNameExists(parentTypeName, prismaOutputTypeName, fieldName, config, stage, 'ordering');
    }
}
exports.SchemaBuilder = SchemaBuilder;
//# sourceMappingURL=builder.js.map