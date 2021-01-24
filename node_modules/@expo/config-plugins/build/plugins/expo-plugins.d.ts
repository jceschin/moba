/**
 * These are the versioned first-party plugins with some of the future third-party plugins mixed in for legacy support.
 */
import { ConfigPlugin } from '../Plugin.types';
/**
 * Config plugin to apply all of the custom Expo iOS config plugins we support by default.
 * TODO: In the future most of this should go into versioned packages like expo-facebook, expo-updates, etc...
 */
export declare const withExpoIOSPlugins: ConfigPlugin<{
    bundleIdentifier: string;
}>;
/**
 * Config plugin to apply all of the custom Expo Android config plugins we support by default.
 * TODO: In the future most of this should go into versioned packages like expo-facebook, expo-updates, etc...
 */
export declare const withExpoAndroidPlugins: ConfigPlugin<{
    package: string;
}>;
export declare const withExpoVersionedSDKPlugins: ConfigPlugin<{
    expoUsername: string | null;
}>;
