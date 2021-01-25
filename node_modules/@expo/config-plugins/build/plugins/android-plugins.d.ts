import { ExpoConfig } from '@expo/config-types';
import { ConfigPlugin, Mod } from '../Plugin.types';
import { AndroidManifest } from '../android/Manifest';
import { ApplicationProjectFile, GradleProjectFile } from '../android/Paths';
import { ResourceXML } from '../android/Resources';
declare type OptionalPromise<T> = T | Promise<T>;
declare type MutateDataAction<T> = (expo: ExpoConfig, data: T) => OptionalPromise<T>;
/**
 * Helper method for creating mods from existing config functions.
 *
 * @param action
 */
export declare function createAndroidManifestPlugin(action: MutateDataAction<AndroidManifest>, name: string): ConfigPlugin;
export declare function createStringsXmlPlugin(action: MutateDataAction<ResourceXML>, name: string): ConfigPlugin;
/**
 * Provides the AndroidManifest.xml for modification.
 *
 * @param config
 * @param action
 */
export declare const withAndroidManifest: ConfigPlugin<Mod<AndroidManifest>>;
/**
 * Provides the strings.xml for modification.
 *
 * @param config
 * @param action
 */
export declare const withStringsXml: ConfigPlugin<Mod<ResourceXML>>;
/**
 * Provides the project MainActivity for modification.
 *
 * @param config
 * @param action
 */
export declare const withMainActivity: ConfigPlugin<Mod<ApplicationProjectFile>>;
/**
 * Provides the project /build.gradle for modification.
 *
 * @param config
 * @param action
 */
export declare const withProjectBuildGradle: ConfigPlugin<Mod<GradleProjectFile>>;
/**
 * Provides the app/build.gradle for modification.
 *
 * @param config
 * @param action
 */
export declare const withAppBuildGradle: ConfigPlugin<Mod<GradleProjectFile>>;
/**
 * Provides the /settings.gradle for modification.
 *
 * @param config
 * @param action
 */
export declare const withSettingsGradle: ConfigPlugin<Mod<GradleProjectFile>>;
export {};
