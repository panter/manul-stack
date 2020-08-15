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
exports.linkableProjectDir = exports.linkableResolve = exports.linkableRequire = void 0;
const Path = __importStar(require("path"));
/**
 * A wrapper around require. It does nothing special except when LINK env var is
 * set in which case it prefixes the import path with CWD. This is essential
 * when dealing with plugin or plugin-like situations.
 *
 * In prisma case, Prisma Client is generated into user's project and required by other packages in
 * user's prject. Problem is when those "other packages" are LINKED, then their
 * attempts to import fail because they are looking relative to their location
 * on disk, not hte user's project, where they just LINKED into.
 */
function linkableRequire(id) {
    if (process.env.LINK) {
        return require(Path.join(process.cwd(), 'node_modules', id));
    }
    else {
        return require(id);
    }
}
exports.linkableRequire = linkableRequire;
function linkableResolve(id) {
    if (process.env.LINK) {
        return require.resolve(Path.join(process.cwd(), 'node_modules', id));
    }
    else {
        return require.resolve(id);
    }
}
exports.linkableResolve = linkableResolve;
function linkableProjectDir() {
    if (process.env.LINK) {
        return process.cwd();
    }
    else {
        // lib/src/nexus-plugin-prisma/node_modules
        return Path.join(__dirname, '..', '..', '..', '..', '..');
    }
}
exports.linkableProjectDir = linkableProjectDir;
//# sourceMappingURL=linkable.js.map