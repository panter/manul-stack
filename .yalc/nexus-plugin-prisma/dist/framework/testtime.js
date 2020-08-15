"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.plugin = void 0;
const prisma_client_1 = require("./lib/prisma-client");
exports.plugin = (settings) => (project) => {
    return {
        app: {
            db: {
                client: prisma_client_1.getPrismaClientInstance(settings === null || settings === void 0 ? void 0 : settings.client, project.log),
            },
        },
    };
};
//# sourceMappingURL=testtime.js.map