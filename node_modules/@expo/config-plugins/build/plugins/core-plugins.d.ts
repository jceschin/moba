import { ConfigPlugin, ExportedConfig, Mod, ModPlatform, StaticPlugin } from '../Plugin.types';
import { PluginHistoryItem } from '../utils/history';
/**
 * Resolves a list of plugins.
 *
 * @param config exported config
 * @param plugins list of config config plugins to apply to the exported config
 */
export declare const withPlugins: ConfigPlugin<(StaticPlugin | ConfigPlugin | string)[]>;
/**
 * Prevents the same plugin from being run twice.
 * Used for migrating from unversioned expo config plugins to versioned plugins.
 *
 * @param config
 * @param name
 */
export declare const withRunOnce: ConfigPlugin<{
    plugin: ConfigPlugin<void>;
    name: PluginHistoryItem['name'];
    version?: PluginHistoryItem['version'];
}>;
/**
 * Helper method for creating mods from existing config functions.
 *
 * @param action
 */
export declare function createRunOncePlugin<T>(plugin: ConfigPlugin<T>, name: string, version?: string): ConfigPlugin<T>;
/**
 * Mods that don't modify any data, all unresolved functionality is performed inside a dangerous mod.
 * All dangerous mods run first before other mods.
 *
 * @param config
 * @param platform
 * @param action
 */
export declare const withDangerousMod: ConfigPlugin<[ModPlatform, Mod<unknown>]>;
/**
 * Plugin to extend a mod function in the plugins config.
 *
 * @param config exported config
 * @param platform platform to target (ios or android)
 * @param mod name of the platform function to extend
 * @param action method to run on the mod when the config is compiled
 */
export declare function withExtendedMod<T>(config: ExportedConfig, { platform, mod, action, }: {
    platform: ModPlatform;
    mod: string;
    action: Mod<T>;
}): ExportedConfig;
/**
 * Plugin to intercept execution of a given `mod` with the given `action`.
 * If an action was already set on the given `config` config for `mod`, then it
 * will be provided to the `action` as `nextMod` when it's evaluated, otherwise
 * `nextMod` will be an identity function.
 *
 * @param config exported config
 * @param platform platform to target (ios or android)
 * @param mod name of the platform function to intercept
 * @param skipEmptyMod should skip running the action if there is no existing mod to intercept
 * @param action method to run on the mod when the config is compiled
 */
export declare function withInterceptedMod<T>(config: ExportedConfig, { platform, mod, action, skipEmptyMod, }: {
    platform: ModPlatform;
    mod: string;
    action: Mod<T>;
    skipEmptyMod?: boolean;
}): ExportedConfig;
