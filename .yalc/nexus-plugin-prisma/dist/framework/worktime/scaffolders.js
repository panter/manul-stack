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
Object.defineProperty(exports, "__esModule", { value: true });
exports.emptySchema = exports.exampleModelBlock = exports.prismaClientGeneratorBlock = void 0;
const common_tags_1 = require("common-tags");
const fs = __importStar(require("fs-jetpack"));
const os = __importStar(require("os"));
function prismaClientGeneratorBlock(schemaPath) {
    return __awaiter(this, void 0, void 0, function* () {
        const generatorBlock = os.EOL +
            common_tags_1.stripIndent `
      generator prisma_client {
        provider = "prisma-client-js"
      }
    ` +
            os.EOL;
        yield fs.appendAsync(schemaPath, `${generatorBlock}`);
    });
}
exports.prismaClientGeneratorBlock = prismaClientGeneratorBlock;
function exampleModelBlock(schemaPath) {
    return __awaiter(this, void 0, void 0, function* () {
        const exampleModelContent = common_tags_1.stripIndent `
      // This "Example" model has been generated for you by Nexus.
      // Nexus does this when you do not have any models defined.
      // For more detail and examples of working with your Prisma
      // Schema, refer to its complete docs at https://pris.ly/d/prisma-schema.

      model Example {
        id    Int     @id @default(autoincrement())
        email String  @unique
        name  String?
      }
    ` + os.EOL;
        yield fs.appendAsync(schemaPath, `${os.EOL}${exampleModelContent}`);
    });
}
exports.exampleModelBlock = exampleModelBlock;
function emptySchema(schemaPath) {
    return __awaiter(this, void 0, void 0, function* () {
        const content = common_tags_1.stripIndent `
    // This Prisma Schema file was created by Nexus
    // If you're new to Nexus or Prisma you may find these docs useful: 
    //
    //   - Prisma plugin docs http://nxs.li/nexus-plugin-prisma
    //   - Prisma Schema docs https://pris.ly/d/prisma-schema
  ` + os.EOL;
        yield fs.writeAsync(schemaPath, content);
    });
}
exports.emptySchema = emptySchema;
//# sourceMappingURL=scaffolders.js.map