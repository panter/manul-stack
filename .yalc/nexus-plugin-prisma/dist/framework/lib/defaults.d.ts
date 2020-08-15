import { DeepPartial } from 'nexus/dist/lib/utils';
/**
 * Small utils to deal with options that have default values.
 * To get the best out of typings, do not explicitely type the `inputDefaults` to let type inference do its magic
 *
 * @example
 *
 * type Settings = {
 *   foo?: string
 *   bar?: string
 * }
 *
 * const defaultSettings = {
 *   foo: 'abc'
 * }
 *
 * function processSettings(inputSettings: Settings) {
 *   const settings = withDefaults(inputSettings, defaultSettings)
 *
 *   settings.foo // <== typed as non-optional field
 *   settings.bar // <== typed as optional field
 * }
 */
export declare function withDefaults<T extends Record<string, any>, U extends DeepPartial<T>>(inputOptions: T | undefined, inputDefaults: U): U & T;
//# sourceMappingURL=defaults.d.ts.map