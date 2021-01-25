"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_plugins_1 = require("./core-plugins");
/**
 * Helper method for creating mods from existing config functions.
 *
 * @param action
 */
function createAndroidManifestPlugin(action, name) {
    const withUnknown = config => exports.withAndroidManifest(config, async (config) => {
        config.modResults = await action(config, config.modResults);
        return config;
    });
    if (name) {
        Object.defineProperty(withUnknown, 'name', {
            value: name,
        });
    }
    return withUnknown;
}
exports.createAndroidManifestPlugin = createAndroidManifestPlugin;
function createStringsXmlPlugin(action, name) {
    const withUnknown = config => exports.withStringsXml(config, async (config) => {
        config.modResults = await action(config, config.modResults);
        return config;
    });
    if (name) {
        Object.defineProperty(withUnknown, 'name', {
            value: name,
        });
    }
    return withUnknown;
}
exports.createStringsXmlPlugin = createStringsXmlPlugin;
/**
 * Provides the AndroidManifest.xml for modification.
 *
 * @param config
 * @param action
 */
exports.withAndroidManifest = (config, action) => {
    return core_plugins_1.withExtendedMod(config, {
        platform: 'android',
        mod: 'manifest',
        action,
    });
};
/**
 * Provides the strings.xml for modification.
 *
 * @param config
 * @param action
 */
exports.withStringsXml = (config, action) => {
    return core_plugins_1.withExtendedMod(config, {
        platform: 'android',
        mod: 'strings',
        action,
    });
};
/**
 * Provides the project MainActivity for modification.
 *
 * @param config
 * @param action
 */
exports.withMainActivity = (config, action) => {
    return core_plugins_1.withExtendedMod(config, {
        platform: 'android',
        mod: 'mainActivity',
        action,
    });
};
/**
 * Provides the project /build.gradle for modification.
 *
 * @param config
 * @param action
 */
exports.withProjectBuildGradle = (config, action) => {
    return core_plugins_1.withExtendedMod(config, {
        platform: 'android',
        mod: 'projectBuildGradle',
        action,
    });
};
/**
 * Provides the app/build.gradle for modification.
 *
 * @param config
 * @param action
 */
exports.withAppBuildGradle = (config, action) => {
    return core_plugins_1.withExtendedMod(config, {
        platform: 'android',
        mod: 'appBuildGradle',
        action,
    });
};
/**
 * Provides the /settings.gradle for modification.
 *
 * @param config
 * @param action
 */
exports.withSettingsGradle = (config, action) => {
    return core_plugins_1.withExtendedMod(config, {
        platform: 'android',
        mod: 'settingsGradle',
        action,
    });
};
//# sourceMappingURL=android-plugins.js.map