"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
exports.prisma = (settings) => ({
    settings,
    packageJsonPath: require.resolve('../../package.json'),
    runtime: {
        module: require.resolve('./runtime'),
        export: 'plugin',
    },
    worktime: {
        module: require.resolve('./worktime'),
        export: 'plugin',
    },
    testtime: {
        module: require.resolve('./testtime'),
        export: 'plugin',
    },
});
exports.default = exports.prisma;
//# sourceMappingURL=index.js.map