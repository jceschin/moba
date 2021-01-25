"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_plugins_1 = require("./core-plugins");
/**
 * Helper method for creating mods from existing config functions.
 *
 * @param action
 */
function createInfoPlistPlugin(action, name) {
    const withUnknown = config => exports.withInfoPlist(config, async (config) => {
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
exports.createInfoPlistPlugin = createInfoPlistPlugin;
/**
 * Helper method for creating mods from existing config functions.
 *
 * @param action
 */
function createEntitlementsPlugin(action, name) {
    const withUnknown = config => exports.withEntitlementsPlist(config, async (config) => {
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
exports.createEntitlementsPlugin = createEntitlementsPlugin;
/**
 * Provides the AppDelegate file for modification.
 *
 * @param config
 * @param action
 */
exports.withAppDelegate = (config, action) => {
    return core_plugins_1.withExtendedMod(config, {
        platform: 'ios',
        mod: 'appDelegate',
        action,
    });
};
/**
 * Provides the Info.plist file for modification.
 * Keeps the config's expo.ios.infoPlist object in sync with the data.
 *
 * @param config
 * @param action
 */
exports.withInfoPlist = (config, action) => {
    return core_plugins_1.withExtendedMod(config, {
        platform: 'ios',
        mod: 'infoPlist',
        async action(config) {
            config = await action(config);
            if (!config.ios) {
                config.ios = {};
            }
            config.ios.infoPlist = config.modResults;
            return config;
        },
    });
};
/**
 * Provides the main .entitlements file for modification.
 * Keeps the config's expo.ios.entitlements object in sync with the data.
 *
 * @param config
 * @param action
 */
exports.withEntitlementsPlist = (config, action) => {
    return core_plugins_1.withExtendedMod(config, {
        platform: 'ios',
        mod: 'entitlements',
        async action(config) {
            config = await action(config);
            if (!config.ios) {
                config.ios = {};
            }
            config.ios.entitlements = config.modResults;
            return config;
        },
    });
};
/**
 * Provides the Expo.plist for modification.
 *
 * @param config
 * @param action
 */
exports.withExpoPlist = (config, action) => {
    return core_plugins_1.withExtendedMod(config, {
        platform: 'ios',
        mod: 'expoPlist',
        action,
    });
};
/**
 * Provides the main .xcodeproj for modification.
 *
 * @param config
 * @param action
 */
exports.withXcodeProject = (config, action) => {
    return core_plugins_1.withExtendedMod(config, {
        platform: 'ios',
        mod: 'xcodeproj',
        action,
    });
};
//# sourceMappingURL=ios-plugins.js.map