"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationStrategies = void 0;
const prisma_1 = require("./prisma");
const relay_1 = require("./relay");
exports.paginationStrategies = {
    relay: relay_1.relayStrategy,
    prisma: prisma_1.prismaStrategy,
};
//# sourceMappingURL=index.js.map