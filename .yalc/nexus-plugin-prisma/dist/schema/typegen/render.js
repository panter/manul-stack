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
exports.render = exports.doGenerate = exports.generate = exports.generateSync = void 0;
const outdent_1 = require("outdent");
const Path = __importStar(require("path"));
const transformer_1 = require("../dmmf/transformer");
const mapping_1 = require("../mapping");
const naming_strategies_1 = require("../naming-strategies");
const utils_1 = require("../utils");
function generateSync(options) {
    doGenerate(true, options);
}
exports.generateSync = generateSync;
function generate(options) {
    return doGenerate(false, options);
}
exports.generate = generate;
function doGenerate(sync, options) {
    const paginationStrategy = options.paginationStrategy;
    const prismaClientImportId = Path.isAbsolute(options.typegenPath) && Path.isAbsolute(options.prismaClientPath)
        ? Path.relative(Path.dirname(options.typegenPath), options.prismaClientPath)
        : options.prismaClientPath;
    const dmmf = transformer_1.getTransformedDmmf(options.prismaClientPath);
    const tsDeclaration = render({
        dmmf,
        paginationStrategy,
        prismaClientImportId,
        nexusPrismaImportId: options.nexusPrismaImportId,
    });
    if (sync) {
        utils_1.hardWriteFileSync(options.typegenPath, tsDeclaration);
    }
    else {
        return utils_1.hardWriteFile(options.typegenPath, tsDeclaration);
    }
}
exports.doGenerate = doGenerate;
function render(params) {
    var _a;
    return `\
import * as Typegen from '${(_a = params.nexusPrismaImportId) !== null && _a !== void 0 ? _a : 'nexus-plugin-prisma/typegen'}'
import * as Prisma from '${params.prismaClientImportId}';

// Pagination type
${renderPaginationType(params.paginationStrategy)}

// Prisma custom scalar names
${renderCustomScalars(params.dmmf)}

// Prisma model type definitions
${renderPrismaModels(params.dmmf)}

// Prisma input types metadata
${renderNexusPrismaInputs(params.dmmf)}

// Prisma output types metadata
${renderNexusPrismaOutputs(params.dmmf)}

// Helper to gather all methods relative to a model
${renderNexusPrismaMethods(params.dmmf)}

interface NexusPrismaGenTypes {
  inputs: NexusPrismaInputs
  outputs: NexusPrismaOutputs
  methods: NexusPrismaMethods
  models: PrismaModels
  pagination: Pagination
  scalars: CustomScalars
}

declare global {
  interface NexusPrismaGen extends NexusPrismaGenTypes {}

  type NexusPrisma<
    TypeName extends string,
    ModelOrCrud extends 'model' | 'crud'
  > = Typegen.GetNexusPrisma<TypeName, ModelOrCrud>;
}
  `;
}
exports.render = render;
function renderPrismaModels(dmmf) {
    return `\
interface PrismaModels {
${dmmf.datamodel.models.map((m) => `  ${m.name}: Prisma.${m.name}`).join('\n')}
}`;
}
function renderNexusPrismaOutputs(dmmf) {
    const queriesByType = mapping_1.getCrudMappedFields('Query', dmmf).map((mappedfield) => ({
        fieldName: mappedfield.field.name,
        returnType: mappedfield.field.outputType.type,
    }));
    const mutationsByType = mapping_1.getCrudMappedFields('Mutation', dmmf).map((mappedField) => ({
        fieldName: mappedField.field.name,
        returnType: mappedField.field.outputType.type,
    }));
    const fieldsByType = dmmf.datamodel.models.reduce((acc, m) => {
        acc[m.name] = m.fields.map((f) => ({
            fieldName: f.name,
            returnType: f.type,
        }));
        return acc;
    }, {});
    // TODO: Add JS Docs
    const renderNexusPrismaType = (input) => `\
${input.map((f) => `    ${f.fieldName}: '${f.returnType}'`).join('\n')}`;
    return `\
interface NexusPrismaOutputs {
  Query: {
${renderNexusPrismaType(queriesByType)}
  },
  Mutation: {
${renderNexusPrismaType(mutationsByType)}
  },
${Object.entries(fieldsByType)
        .map(([modelName, fields]) => `  ${modelName}: {
${renderNexusPrismaType(fields)}
  }`)
        .join('\n')}
}`;
}
function renderNexusPrismaInputs(dmmf) {
    const queriesFields = mapping_1.getCrudMappedFields('Query', dmmf)
        .filter((mappedField) => mappedField.field.outputType.isList && mappedField.field.outputType.kind === 'object')
        .map((mappedField) => {
        const whereArg = mappedField.field.args.find((a) => a.name === 'where');
        const orderByArg = mappedField.field.args.find((a) => a.name === 'orderBy');
        const whereInput = dmmf.schema.inputTypes.find((i) => i.name === whereArg.inputType.type);
        const orderByInput = dmmf.schema.inputTypes.find((i) => i.name === orderByArg.inputType.type);
        return {
            fieldName: naming_strategies_1.defaultFieldNamingStrategy[mappedField.operation](mappedField.field.name, mappedField.model),
            filtering: whereInput,
            ordering: orderByInput,
        };
    });
    const fieldsByType = dmmf.datamodel.models
        .map((m) => dmmf.getOutputType(m.name))
        .reduce((acc, type) => {
        acc[type.name] = type.fields
            .filter((f) => f.outputType.isList && f.outputType.kind === 'object')
            .map((f) => {
            const whereArg = f.args.find((a) => a.name === 'where');
            const orderByArg = f.args.find((a) => a.name === 'orderBy');
            const whereInput = dmmf.schema.inputTypes.find((i) => i.name === whereArg.inputType.type);
            const orderByInput = dmmf.schema.inputTypes.find((i) => i.name === orderByArg.inputType.type);
            return {
                fieldName: f.name,
                filtering: whereInput,
                ordering: orderByInput,
            };
        });
        return acc;
    }, {});
    // TODO: Add JS Docs
    const renderNexusPrismaInput = (input) => `\
${input
        .map((f) => `    ${f.fieldName}: {
      filtering: ${f.filtering.fields.map((f) => `'${f.name}'`).join(' | ')}
      ordering: ${f.ordering.fields.map((f) => `'${f.name}'`).join(' | ')}
    }`)
        .join('\n')}`;
    return `\
interface NexusPrismaInputs {
  Query: {
${renderNexusPrismaInput(queriesFields)}
  },
${Object.entries(fieldsByType)
        .map(([modelName, fields]) => `  ${modelName}: {
${renderNexusPrismaInput(fields)}
  }`)
        .join('\n')}
}`;
}
function renderNexusPrismaMethods(dmmf) {
    return `\
interface NexusPrismaMethods {
${dmmf.datamodel.models.map((m) => `  ${m.name}: Typegen.NexusPrismaFields<'${m.name}'>`).join('\n')}
  Query: Typegen.NexusPrismaFields<'Query'>
  Mutation: Typegen.NexusPrismaFields<'Mutation'>
}`;
}
function renderPaginationType(paginationStrategy) {
    return outdent_1.outdent `
    type Pagination = {
    ${paginationStrategy.paginationArgNames.map((argName) => `  ${argName}?: boolean`).join('\n')}
    }`;
}
function renderCustomScalars(dmmf) {
    if (dmmf.customScalars.length === 0) {
        return `type CustomScalars = 'No custom scalars are used in your Prisma Schema.'`;
    }
    return outdent_1.outdent `
    type CustomScalars = ${dmmf.customScalars.map((s) => `'${s}'`).join(' | ')}`;
}
//# sourceMappingURL=render.js.map