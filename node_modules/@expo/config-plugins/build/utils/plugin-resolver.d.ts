import { ConfigPlugin, StaticPlugin } from '../Plugin.types';
export declare const pluginFileName = "app.plugin.js";
export declare function moduleNameIsDirectFileReference(name: string): boolean;
export declare function normalizeStaticPlugin(plugin: StaticPlugin | ConfigPlugin | string): StaticPlugin;
export declare function assertInternalProjectRoot(projectRoot?: string): asserts projectRoot;
export declare function resolveConfigPluginFunction(projectRoot: string, pluginModulePath: string): ConfigPlugin<unknown>;
/**
 * - Resolve the exported contents of an Expo config (be it default or module.exports)
 * - Assert no promise exports
 * - Return config type
 * - Serialize config
 *
 * @param result
 * @param configFile
 */
export declare function resolveConfigPluginExport(result: any, configFile: string): ConfigPlugin<unknown>;
