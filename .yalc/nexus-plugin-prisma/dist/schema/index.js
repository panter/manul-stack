"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nexusSchemaPrisma = void 0;
const schema_1 = require("@nexus/schema");
const builder_1 = require("./builder");
const warnings_1 = require("./warnings");
/**
 * Create a nexus-plugin-prisma instance to be passed into the Nexus plugins array.
 *
 * The nexus plugin extends the Nexus DSL with `t.model` and `t.crud`. These
 * allow you to expose data from your Prisma layer and operations against that
 * data. Once this plugin is installed, you can do things such as:
 *
 * ```ts
 * objectType({
 *   name: 'User',
 *   definition(t) {
 *     t.model.id()
 *     t.model.email()
 *   }
 * })
 *
 * queryType({
 *   definition (t) {
 *      t.crud.user()
 *      t.crud.users({ filtering: true, ordering: true })
 *    }
 * })
 * ```
 *
 * You must ensure the Prisma Client JS has been generated prior as it provides a
 * data representation of the available models and CRUD operations against them.
 *
 * Like Nexus, NexusPrisma has its own Typegen. By default It will be generated
 * synchronously when Nexus runs the plugin, _if_ `process.env.NODE_ENV` is
 * `undefined` or `"development"`. Typegen can be explicitly enabled or disabled
 * via the shouldGenerateArtifacts option. This mirrors Nexus' own typegen
 * approach. This system will change once the Nexus plugin system has first
 * class support for typegen.
 */
function nexusSchemaPrisma(options) {
    const allOptions = options !== null && options !== void 0 ? options : {};
    let wasCrudUsedButDisabled = null;
    return schema_1.plugin({
        name: 'nexus-plugin-prisma',
        onInstall: (nexusBuilder) => {
            const { types, wasCrudUsedButDisabled: wasCrudUsed } = builder_1.build(Object.assign(Object.assign({}, allOptions), { nexusBuilder }));
            wasCrudUsedButDisabled = wasCrudUsed;
            return {
                types,
            };
        },
        onBeforeBuild() {
            if ((wasCrudUsedButDisabled === null || wasCrudUsedButDisabled === void 0 ? void 0 : wasCrudUsedButDisabled()) === true) {
                if (allOptions.initializedByFramework === true) {
                    warnings_1.CRUD_NOT_ENABLED.framework();
                }
                else {
                    warnings_1.CRUD_NOT_ENABLED.schema();
                }
            }
        },
    });
}
exports.nexusSchemaPrisma = nexusSchemaPrisma;
//# sourceMappingURL=index.js.map