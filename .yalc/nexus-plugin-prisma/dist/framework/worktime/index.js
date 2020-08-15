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
exports.loadEnv = exports.plugin = void 0;
const chalk_1 = __importDefault(require("chalk"));
const common_tags_1 = require("common-tags");
const dotenv = __importStar(require("dotenv"));
const fs = __importStar(require("fs-jetpack"));
const os = __importStar(require("os"));
const Path = __importStar(require("path"));
const defaults_1 = require("../lib/defaults");
const Scaffolders = __importStar(require("./scaffolders"));
const utils_1 = require("./utils");
exports.plugin = (userSettings) => (p) => {
    const settings = defaults_1.withDefaults(userSettings, {
        migrations: true,
    });
    p.hooks.build.onStart = () => __awaiter(void 0, void 0, void 0, function* () {
        yield runPrismaGenerators(p);
    });
    p.hooks.create.onAfterBaseSetup = (hctx) => __awaiter(void 0, void 0, void 0, function* () {
        if (hctx.database === undefined) {
            throw new Error('Should never happen. Prisma plugin should not be installed if no database were chosen in the create workflow');
        }
        const datasource = renderDatasource(hctx.database);
        yield Promise.all([
            fs.appendAsync('.gitignore', os.EOL +
                common_tags_1.stripIndent `
                # Prisma
                failed-inferMigrationSteps*
              `),
            fs.writeAsync('prisma/schema.prisma', datasource +
                os.EOL +
                common_tags_1.stripIndent `
              generator prisma_client {
                provider = "prisma-client-js"
              }
     
              model World {
                id         Int    @id @default(autoincrement())
                name       String @unique
                population Float
              }
            `),
            fs.writeAsync('prisma/.env', common_tags_1.stripIndent `
          DATABASE_URL="${renderConnectionURI({ database: hctx.database, connectionURI: hctx.connectionURI }, p.layout.project.name)}"
        `),
            fs.writeAsync('prisma/seed.ts', common_tags_1.stripIndent `
          import { PrismaClient } from '@prisma/client'

          const db = new PrismaClient()
          
          main()
          
          async function main() {
            const worlds = [
              {
                name: 'Earth',
                population: 6_000_000_000,
              },
              {
                name: 'Mars',
                population: 0,
              },
            ]

            // Could use Promise.all
            // Sequential here so that world IDs match the array order above

            let results = []

            for (const world of worlds) {
              results.push(await db.world.create({ data: world }))
            }

            console.log('Seeded: %j', results)
          
            db.disconnect()
          }
        `),
            fs.writeAsync(p.layout.sourcePath('graphql.ts'), common_tags_1.stripIndent `
              import { schema } from "nexus"
      
              schema.objectType({
                name: "World",
                definition(t) {
                  t.model.id()
                  t.model.name()
                  t.model.population()
                }
              })
      
              schema.queryType({
                definition(t) {
                  t.field("hello", {
                    type: "World",
                    args: {
                      world: schema.stringArg({ required: false })
                    },
                    async resolve(_root, args, ctx) {
                      const worldToFindByName = args.world ?? 'Earth'
                      const world = await ctx.db.world.findOne({
                        where: {
                          name: worldToFindByName
                        }
                      })
      
                      if (!world) throw new Error(\`No such world named "\${args.world}"\`)
      
                      return world
                    }
                  })
  
                  t.list.field('worlds', {
                    type: 'World',
                    resolve(_root, _args, ctx) { 
                      return ctx.db.world.findMany()
                    }
                  })
                }
              })
            `),
            fs.writeAsync(p.layout.sourcePath('app.ts'), common_tags_1.stripIndent `
          import { use } from 'nexus'
          import { prisma } from 'nexus-plugin-prisma'

          use(prisma())
        `),
        ]);
        if (hctx.connectionURI || hctx.database === 'SQLite') {
            p.log.info('Initializing development database...');
            // TODO expose run on nexus
            yield p.packageManager.runBin('prisma migrate save --create-db --name init --experimental', {
                require: true,
            });
            yield p.packageManager.runBin('prisma migrate up -c --experimental', {
                require: true,
            });
            p.log.info('Generating Prisma Client JS...');
            yield p.packageManager.runBin('prisma generate', { require: true });
            p.log.info('Seeding development database...');
            yield p.packageManager.runBin('ts-node prisma/seed', {
                require: true,
            });
        }
        else {
            p.log.info(common_tags_1.stripIndent `
            1. Please setup your ${hctx.database} and fill in the connection uri in your \`${chalk_1.default.greenBright('prisma/.env')}\` file.
          `);
            p.log.info(common_tags_1.stripIndent `
              2. Run \`${chalk_1.default.greenBright(p.packageManager.renderRunBin('prisma migrate save --experimental'))}\` to create your first migration file.
          `);
            p.log.info(common_tags_1.stripIndent `
            3. Run \`${chalk_1.default.greenBright(p.packageManager.renderRunBin('prisma migrate up --experimental'))}\` to migrate your database.
          `);
            p.log.info(common_tags_1.stripIndent `
          4. Run \`${chalk_1.default.greenBright(p.packageManager.renderRunBin('prisma generate'))}\` to generate the Prisma Client.
        `);
            p.log.info(common_tags_1.stripIndent `
            5. Run \`${chalk_1.default.greenBright(p.packageManager.renderRunBin('ts-node prisma/seed.ts'))}\` to seed your database.
          `);
            p.log.info(common_tags_1.stripIndent `
            6. Run \`${chalk_1.default.greenBright(p.packageManager.renderRunScript('dev'))}\` to start working.
          `);
        }
    });
    // dev
    p.hooks.dev.onStart = () => __awaiter(void 0, void 0, void 0, function* () {
        yield runPrismaGenerators(p);
    });
    p.hooks.dev.onFileWatcherEvent = (_event, file, _stats, watcher) => __awaiter(void 0, void 0, void 0, function* () {
        p.log.info('settings', { settings });
        if (file.match(/.*schema\.prisma$/)) {
            if (settings.migrations === true) {
                yield promptForMigration(p, watcher, file);
            }
            else {
                yield runPrismaGenerators(p);
                watcher.restart(file);
            }
        }
    });
    p.hooks.dev.addToWatcherSettings = {
        // TODO preferably we allow schema.prisma to be anywhere but they show up in
        // migrations folder too and we don't know how to achieve semantic "anywhere
        // but migrations folder"
        watchFilePatterns: ['./schema.prisma', './prisma/schema.prisma'],
        listeners: {
            app: {
                ignoreFilePatterns: ['./prisma/**', './schema.prisma'],
            },
            plugin: {
                allowFilePatterns: ['./schema.prisma', './prisma/schema.prisma'],
            },
        },
    };
    return exports.plugin;
};
/**
 * Compute the resolved settings of a generator which has its baked in manifest
 * but also user-provided overrides. This computes the merger of the two.
 */
function getGeneratorResolvedSettings(g) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    return {
        name: (_b = (_a = g.manifest) === null || _a === void 0 ? void 0 : _a.prettyName) !== null && _b !== void 0 ? _b : '',
        instanceName: (_d = (_c = g.options) === null || _c === void 0 ? void 0 : _c.generator.name) !== null && _d !== void 0 ? _d : '',
        output: (_h = (_f = (_e = g.options) === null || _e === void 0 ? void 0 : _e.generator.output) !== null && _f !== void 0 ? _f : (_g = g.manifest) === null || _g === void 0 ? void 0 : _g.defaultOutput) !== null && _h !== void 0 ? _h : '',
    };
}
const DATABASE_TO_PRISMA_PROVIDER = {
    SQLite: 'sqlite',
    MySQL: 'mysql',
    PostgreSQL: 'postgresql',
};
function renderDatasource(database) {
    const provider = DATABASE_TO_PRISMA_PROVIDER[database];
    return (common_tags_1.stripIndent `
      datasource db {
        provider = "${provider}"
        url      = env("DATABASE_URL")
      }
    ` + os.EOL);
}
const DATABASE_TO_CONNECTION_URI = {
    SQLite: (_) => 'file:./dev.db',
    PostgreSQL: (projectName) => `postgresql://postgres:postgres@localhost:5432/${projectName}`,
    // todo some values for projectName are invalid. For example "mysql" will leading to errors:
    // https://github.com/prisma/migrate/issues/491
    MySQL: (projectName) => `mysql://root:<password>@localhost:3306/${projectName}`,
};
function renderConnectionURI(db, projectName) {
    if (db.connectionURI) {
        return db.connectionURI;
    }
    return DATABASE_TO_CONNECTION_URI[db.database](projectName);
}
/**
 * Execute all the generators in the user's PSL file.
 */
function runPrismaGenerators(p, options = { silent: false }) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!options.silent) {
            p.log.info('Running generators');
        }
        const schemaPath = yield findOrScaffoldPrismaSchema(p);
        loadEnv(p, schemaPath);
        p.log.trace('loading generators...');
        const generators = yield utils_1.getGenerators(p, schemaPath);
        p.log.trace('generators loaded.');
        for (const generator of generators) {
            const resolvedSettings = getGeneratorResolvedSettings(generator);
            p.log.trace('generating', resolvedSettings);
            yield generator.generate();
            generator.stop();
            p.log.trace('done generating', resolvedSettings);
        }
    });
}
function loadEnv(p, schemaPath) {
    const schemaDir = Path.dirname(schemaPath);
    let envPath = Path.join(schemaDir, '.env');
    // Look next to `schema.prisma`, other look in project root
    if (!fs.exists(envPath)) {
        envPath = Path.join(p.layout.projectRoot, '.env');
    }
    if (!fs.exists(envPath)) {
        p.log.trace(`No .env file found. Looked at: ${envPath}`);
        return;
    }
    p.log.trace(`.env file found. Looked at: ${envPath}`);
    dotenv.config({ path: envPath });
}
exports.loadEnv = loadEnv;
/**
 * Find the PSL file in the project.
 */
function findOrScaffoldPrismaSchema(p) {
    return __awaiter(this, void 0, void 0, function* () {
        const projectRoot = p.layout.projectRoot;
        const rootSchemaPath = Path.join(projectRoot, 'schema.prisma');
        const prismaSchemaPath = Path.join(projectRoot, 'prisma', 'schema.prisma');
        const [rootSchemaPathExists, prismaSchemaPathExists] = yield Promise.all([
            fs.existsAsync(rootSchemaPath),
            fs.existsAsync(prismaSchemaPath),
        ]);
        // todo warn when multiple found
        // todo what are the rules of where a prisma schema can be?
        // todo what if user has prisma schema in 4 different places? Shouldn't we
        // warn about all?
        if (prismaSchemaPathExists)
            return prismaSchemaPath;
        if (rootSchemaPathExists)
            return rootSchemaPath;
        // Scaffold an empty prisma schema
        yield Scaffolders.emptySchema(prismaSchemaPath);
        const message = `An empty Prisma Schema has been created for you at ${chalk_1.default.bold(p.layout.projectRelative(prismaSchemaPath))}`;
        p.log.warn(message);
        return prismaSchemaPath;
    });
}
function promptForMigration(p, watcher, file) {
    return __awaiter(this, void 0, void 0, function* () {
        watcher.pause();
        p.log.info('We detected a change in your Prisma Schema file.');
        p.log.info("If you're using Prisma Migrate, follow the step below:");
        p.log.info(`1. Run ${chalk_1.default.greenBright(p.packageManager.renderRunBin('prisma migrate save --experimental'))} to create a migration file.`);
        p.log.info(`2. Run ${chalk_1.default.greenBright(p.packageManager.renderRunBin('prisma migrate up --experimental'))} to apply your migration.`);
        yield p.prompt({
            type: 'confirm',
            name: 'confirm',
            message: 'Press Y to restart once your migration is applied',
            initial: true,
            yesOption: '(Y)',
            noOption: '(Y)',
            yes: 'Restarting...',
            no: 'Restarting...',
        });
        yield runPrismaGenerators(p);
        watcher.restart(file);
    });
}
//# sourceMappingURL=index.js.map