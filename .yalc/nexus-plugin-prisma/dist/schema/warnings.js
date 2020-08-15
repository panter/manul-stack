"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CRUD_NOT_ENABLED = void 0;
const colors_1 = require("./colors");
exports.CRUD_NOT_ENABLED = {
    schema: () => {
        console.log(`\
${colors_1.colors.yellow('Warning')}: ${colors_1.colors.green('t.crud')} ${colors_1.colors.yellow('is an experimental feature with many practical limitations. You must explicitly enable it before using.')}
Please add ${colors_1.colors.green(`experimentalCRUD: true`)} in the ${colors_1.colors.green('nexusSchemaPrisma()')} constructor if you still wish to enable it.`);
    },
    framework: () => {
        console.log(`\
${colors_1.colors.yellow('Warning')}: ${colors_1.colors.green('t.crud')} ${colors_1.colors.yellow('is an experimental feature with many practical limitations. You must explicitly enable it before using.')}
Please add ${colors_1.colors.green(`features: { crud: true }`)} in the ${colors_1.colors.green('prisma()')} constructor if you still wish to enable it.`);
    },
};
//# sourceMappingURL=warnings.js.map