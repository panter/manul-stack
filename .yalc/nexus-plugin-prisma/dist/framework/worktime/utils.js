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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGenerators = exports.PRISMA_QUERY_ENGINE_VERSION = void 0;
const Prisma = __importStar(require("@prisma/sdk"));
const chalk_1 = __importDefault(require("chalk"));
const strip_ansi_1 = __importDefault(require("strip-ansi"));
const Scaffolders = __importStar(require("./scaffolders"));
/**
 * Pinned query-engine version. Calculated at build time and based on `@prisma/cli` version
 */
exports.PRISMA_QUERY_ENGINE_VERSION = require('@prisma/cli/package.json').prisma.version;
/**
 * Get the declared generator blocks in the user's PSL file.
 *
 * If Prisma SDK throws a no-models-found error then it is caught, a model is
 * scaffolded, and this function is re-run.
 */
function getGenerators(nexus, schemaPath) {
    return __awaiter(this, void 0, void 0, function* () {
        return Prisma.getGenerators({
            schemaPath,
            printDownloadProgress: false,
            version: exports.PRISMA_QUERY_ENGINE_VERSION,
        })
            .catch((e) => __awaiter(this, void 0, void 0, function* () {
            if (isNoModelsDefinedError(e)) {
                yield Scaffolders.exampleModelBlock(schemaPath);
                nexus.log.warn(`An example model has been scaffolded for you in ${chalk_1.default.bold(nexus.layout.projectRelative(schemaPath))}`);
                return getGenerators(nexus, schemaPath);
            }
            return Promise.reject(e);
        }))
            .then((generators) => __awaiter(this, void 0, void 0, function* () {
            const hasClientGenerator = generators.find((g) => { var _a; return ((_a = g.options) === null || _a === void 0 ? void 0 : _a.generator.provider) === 'prisma-client-js'; });
            if (!hasClientGenerator) {
                yield Scaffolders.prismaClientGeneratorBlock(schemaPath);
                nexus.log.warn(`A Prisma Client generator block has been scaffolded for you in ${chalk_1.default.bold(nexus.layout.projectRelative(schemaPath))}`);
                // TODO: Generate it programmatically instead for performance reason
                return getGenerators(nexus, schemaPath);
            }
            else {
                return generators;
            }
        }));
    });
}
exports.getGenerators = getGenerators;
/**
 * Check if the thrown error is of NoModelsDefined type.
 */
function isNoModelsDefinedError(e) {
    return Boolean(strip_ansi_1.default(e.message).match(/.*You don't have any models defined.*/));
}
//# sourceMappingURL=utils.js.map