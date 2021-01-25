"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const plist_1 = __importDefault(require("@expo/plist"));
const fs_extra_1 = require("fs-extra");
const path_1 = __importDefault(require("path"));
const android_1 = require("../android");
const AndroidPaths = __importStar(require("../android/Paths"));
const Resources_1 = require("../android/Resources");
const Strings_1 = require("../android/Strings");
const Entitlements_1 = require("../ios/Entitlements");
const Paths_1 = require("../ios/Paths");
const Xcodeproj_1 = require("../ios/utils/Xcodeproj");
const XML_1 = require("../utils/XML");
const errors_1 = require("../utils/errors");
const WarningAggregator = __importStar(require("../utils/warnings"));
const core_plugins_1 = require("./core-plugins");
function withBaseMods(config) {
    config = applyIOSBaseMods(config);
    config = applyAndroidBaseMods(config);
    return config;
}
exports.withBaseMods = withBaseMods;
function resolveModResults(results, platformName, modName) {
    // If the results came from a mod, they'd be in the form of [config, data].
    // Ensure the results are an array and omit the data since it should've been written by a data provider plugin.
    const ensuredResults = results;
    // Sanity check to help locate non compliant mods.
    if (!ensuredResults || typeof ensuredResults !== 'object' || !(ensuredResults === null || ensuredResults === void 0 ? void 0 : ensuredResults.mods)) {
        throw new Error(`Mod \`mods.${platformName}.${modName}\` evaluated to an object that is not a valid project config. Instead got: ${JSON.stringify(ensuredResults)}`);
    }
    return ensuredResults;
}
exports.resolveModResults = resolveModResults;
function applyAndroidBaseMods(config) {
    config = withExpoDangerousBaseMod(config, 'android');
    config = withAndroidStringsXMLBaseMod(config);
    config = withAndroidManifestBaseMod(config);
    config = withAndroidMainActivityBaseMod(config);
    config = withAndroidSettingsGradleBaseMod(config);
    config = withAndroidProjectBuildGradleBaseMod(config);
    config = withAndroidAppBuildGradleBaseMod(config);
    return config;
}
const withAndroidManifestBaseMod = config => {
    // Append a rule to supply AndroidManifest.xml data to mods on `mods.android.manifest`
    return core_plugins_1.withInterceptedMod(config, {
        platform: 'android',
        mod: 'manifest',
        skipEmptyMod: true,
        async action(_a) {
            var _b = _a.modRequest, { nextMod } = _b, modRequest = __rest(_b, ["nextMod"]), config = __rest(_a, ["modRequest"]);
            let results = Object.assign(Object.assign({}, config), { modRequest });
            try {
                const filePath = await AndroidPaths.getAndroidManifestAsync(modRequest.projectRoot);
                let modResults = await android_1.Manifest.readAndroidManifestAsync(filePath);
                results = await nextMod(Object.assign(Object.assign({}, config), { modResults,
                    modRequest }));
                resolveModResults(results, modRequest.platform, modRequest.modName);
                modResults = results.modResults;
                await android_1.Manifest.writeAndroidManifestAsync(filePath, modResults);
            }
            catch (error) {
                console.error(`AndroidManifest.xml mod error:`);
                throw error;
            }
            return results;
        },
    });
};
const withAndroidStringsXMLBaseMod = config => {
    // Append a rule to supply strings.xml data to mods on `mods.android.strings`
    return core_plugins_1.withInterceptedMod(config, {
        platform: 'android',
        mod: 'strings',
        skipEmptyMod: true,
        async action(_a) {
            var _b = _a.modRequest, { nextMod } = _b, modRequest = __rest(_b, ["nextMod"]), config = __rest(_a, ["modRequest"]);
            let results = Object.assign(Object.assign({}, config), { modRequest });
            try {
                const filePath = await Strings_1.getProjectStringsXMLPathAsync(modRequest.projectRoot);
                let modResults = await Resources_1.readResourcesXMLAsync({ path: filePath });
                results = await nextMod(Object.assign(Object.assign({}, config), { modResults,
                    modRequest }));
                resolveModResults(results, modRequest.platform, modRequest.modName);
                modResults = results.modResults;
                await XML_1.writeXMLAsync({ path: filePath, xml: modResults });
            }
            catch (error) {
                console.error(`strings.xml mod error:`);
                throw error;
            }
            return results;
        },
    });
};
const withAndroidProjectBuildGradleBaseMod = config => {
    return core_plugins_1.withInterceptedMod(config, {
        platform: 'android',
        mod: 'projectBuildGradle',
        skipEmptyMod: true,
        async action(_a) {
            var _b = _a.modRequest, { nextMod } = _b, modRequest = __rest(_b, ["nextMod"]), config = __rest(_a, ["modRequest"]);
            let results = Object.assign(Object.assign({}, config), { modRequest });
            try {
                let modResults = await AndroidPaths.getProjectBuildGradleAsync(modRequest.projectRoot);
                // Currently don't support changing the path or language
                const filePath = modResults.path;
                results = await nextMod(Object.assign(Object.assign({}, config), { modResults,
                    modRequest }));
                resolveModResults(results, modRequest.platform, modRequest.modName);
                modResults = results.modResults;
                await fs_extra_1.writeFile(filePath, modResults.contents);
            }
            catch (error) {
                console.error(`android/build.gradle mod error:`);
                throw error;
            }
            return results;
        },
    });
};
const withAndroidSettingsGradleBaseMod = config => {
    return core_plugins_1.withInterceptedMod(config, {
        platform: 'android',
        mod: 'settingsGradle',
        skipEmptyMod: true,
        async action(_a) {
            var _b = _a.modRequest, { nextMod } = _b, modRequest = __rest(_b, ["nextMod"]), config = __rest(_a, ["modRequest"]);
            let results = Object.assign(Object.assign({}, config), { modRequest });
            try {
                let modResults = await AndroidPaths.getSettingsGradleAsync(modRequest.projectRoot);
                // Currently don't support changing the path or language
                const filePath = modResults.path;
                results = await nextMod(Object.assign(Object.assign({}, config), { modResults,
                    modRequest }));
                resolveModResults(results, modRequest.platform, modRequest.modName);
                modResults = results.modResults;
                await fs_extra_1.writeFile(filePath, modResults.contents);
            }
            catch (error) {
                console.error(`android/settings.gradle mod error:`);
                throw error;
            }
            return results;
        },
    });
};
const withAndroidAppBuildGradleBaseMod = config => {
    return core_plugins_1.withInterceptedMod(config, {
        platform: 'android',
        mod: 'appBuildGradle',
        skipEmptyMod: true,
        async action(_a) {
            var _b = _a.modRequest, { nextMod } = _b, modRequest = __rest(_b, ["nextMod"]), config = __rest(_a, ["modRequest"]);
            let results = Object.assign(Object.assign({}, config), { modRequest });
            try {
                let modResults = await AndroidPaths.getAppBuildGradleAsync(modRequest.projectRoot);
                // Currently don't support changing the path or language
                const filePath = modResults.path;
                results = await nextMod(Object.assign(Object.assign({}, config), { modResults,
                    modRequest }));
                resolveModResults(results, modRequest.platform, modRequest.modName);
                modResults = results.modResults;
                await fs_extra_1.writeFile(filePath, modResults.contents);
            }
            catch (error) {
                console.error(`android/app/build.gradle mod error:`);
                throw error;
            }
            return results;
        },
    });
};
const withAndroidMainActivityBaseMod = config => {
    return core_plugins_1.withInterceptedMod(config, {
        platform: 'android',
        mod: 'mainActivity',
        skipEmptyMod: true,
        async action(_a) {
            var _b = _a.modRequest, { nextMod } = _b, modRequest = __rest(_b, ["nextMod"]), config = __rest(_a, ["modRequest"]);
            let results = Object.assign(Object.assign({}, config), { modRequest });
            try {
                let modResults = await AndroidPaths.getMainActivityAsync(modRequest.projectRoot);
                // Currently don't support changing the path or language
                const filePath = modResults.path;
                results = await nextMod(Object.assign(Object.assign({}, config), { modResults,
                    modRequest }));
                resolveModResults(results, modRequest.platform, modRequest.modName);
                modResults = results.modResults;
                await fs_extra_1.writeFile(filePath, modResults.contents);
            }
            catch (error) {
                console.error(`MainActivity mod error:`);
                throw error;
            }
            return results;
        },
    });
};
function applyIOSBaseMods(config) {
    config = withExpoDangerousBaseMod(config, 'ios');
    config = withAppDelegateBaseMod(config);
    config = withIosInfoPlistBaseMod(config);
    config = withExpoPlistBaseMod(config);
    config = withXcodeProjectBaseMod(config);
    config = withEntitlementsBaseMod(config);
    return config;
}
const withExpoDangerousBaseMod = (config, platform) => {
    // Used for scheduling when dangerous mods run.
    return core_plugins_1.withInterceptedMod(config, {
        platform,
        mod: 'dangerous',
        skipEmptyMod: true,
        async action(_a) {
            var _b = _a.modRequest, { nextMod } = _b, modRequest = __rest(_b, ["nextMod"]), config = __rest(_a, ["modRequest"]);
            const results = await nextMod(Object.assign(Object.assign({}, config), { modRequest }));
            resolveModResults(results, modRequest.platform, modRequest.modName);
            return results;
        },
    });
};
const withAppDelegateBaseMod = config => {
    return core_plugins_1.withInterceptedMod(config, {
        platform: 'ios',
        mod: 'appDelegate',
        skipEmptyMod: true,
        async action(_a) {
            var _b = _a.modRequest, { nextMod } = _b, modRequest = __rest(_b, ["nextMod"]), config = __rest(_a, ["modRequest"]);
            let results = Object.assign(Object.assign({}, config), { modRequest });
            try {
                let modResults = Paths_1.getAppDelegate(modRequest.projectRoot);
                // Currently don't support changing the path or language
                const filePath = modResults.path;
                results = await nextMod(Object.assign(Object.assign({}, config), { modResults,
                    modRequest }));
                resolveModResults(results, modRequest.platform, modRequest.modName);
                modResults = results.modResults;
                await fs_extra_1.writeFile(filePath, modResults.contents);
            }
            catch (error) {
                console.error(`AppDelegate mod error:`);
                throw error;
            }
            return results;
        },
    });
};
const withExpoPlistBaseMod = config => {
    // Append a rule to supply Expo.plist data to mods on `mods.ios.expoPlist`
    return core_plugins_1.withInterceptedMod(config, {
        platform: 'ios',
        mod: 'expoPlist',
        skipEmptyMod: true,
        async action(_a) {
            var _b = _a.modRequest, { nextMod } = _b, modRequest = __rest(_b, ["nextMod"]), config = __rest(_a, ["modRequest"]);
            const supportingDirectory = path_1.default.join(modRequest.platformProjectRoot, modRequest.projectName, 'Supporting');
            let results = Object.assign(Object.assign({}, config), { modRequest });
            try {
                const filePath = path_1.default.resolve(supportingDirectory, 'Expo.plist');
                let modResults = plist_1.default.parse(await fs_extra_1.readFile(filePath, 'utf8'));
                // TODO: Fix type
                results = await nextMod(Object.assign(Object.assign({}, config), { modResults,
                    modRequest }));
                resolveModResults(results, modRequest.platform, modRequest.modName);
                modResults = results.modResults;
                await fs_extra_1.writeFile(filePath, plist_1.default.build(modResults));
            }
            catch (error) {
                WarningAggregator.addWarningIOS('updates', 'Expo.plist configuration could not be applied. You will need to create Expo.plist if it does not exist and add Updates configuration manually.', 'https://docs.expo.io/bare/updating-your-app/#configuration-options');
            }
            return results;
        },
    });
};
const withXcodeProjectBaseMod = config => {
    // Append a rule to supply .xcodeproj data to mods on `mods.ios.xcodeproj`
    return core_plugins_1.withInterceptedMod(config, {
        platform: 'ios',
        mod: 'xcodeproj',
        skipEmptyMod: true,
        async action(_a) {
            var _b = _a.modRequest, { nextMod } = _b, modRequest = __rest(_b, ["nextMod"]), config = __rest(_a, ["modRequest"]);
            const modResults = Xcodeproj_1.getPbxproj(modRequest.projectRoot);
            // TODO: Fix type
            const results = await nextMod(Object.assign(Object.assign({}, config), { modResults,
                modRequest }));
            resolveModResults(results, modRequest.platform, modRequest.modName);
            const resultData = results.modResults;
            await fs_extra_1.writeFile(resultData.filepath, resultData.writeSync());
            return results;
        },
    });
};
const withIosInfoPlistBaseMod = config => {
    // Append a rule to supply Info.plist data to mods on `mods.ios.infoPlist`
    return core_plugins_1.withInterceptedMod(config, {
        platform: 'ios',
        mod: 'infoPlist',
        skipEmptyMod: true,
        async action(_a) {
            var _b = _a.modRequest, { nextMod } = _b, modRequest = __rest(_b, ["nextMod"]), config = __rest(_a, ["modRequest"]);
            const filePath = Paths_1.getInfoPlistPath(modRequest.projectRoot);
            let results = Object.assign(Object.assign({}, config), { modRequest });
            // Apply all of the Info.plist values to the expo.ios.infoPlist object
            // TODO: Remove this in favor of just overwriting the Info.plist with the Expo object. This will enable people to actually remove values.
            if (!config.ios) {
                config.ios = {};
            }
            if (!config.ios.infoPlist) {
                config.ios.infoPlist = {};
            }
            const contents = await fs_extra_1.readFile(filePath, 'utf8');
            errors_1.assert(contents, 'Info.plist is empty');
            let data = plist_1.default.parse(contents);
            config.ios.infoPlist = Object.assign(Object.assign({}, (data || {})), config.ios.infoPlist);
            // TODO: Fix type
            results = await nextMod(Object.assign(Object.assign({}, config), { modRequest, modResults: config.ios.infoPlist }));
            resolveModResults(results, modRequest.platform, modRequest.modName);
            data = results.modResults;
            await fs_extra_1.writeFile(filePath, plist_1.default.build(data));
            return results;
        },
    });
};
const withEntitlementsBaseMod = config => {
    // Append a rule to supply .entitlements data to mods on `mods.ios.entitlements`
    return core_plugins_1.withInterceptedMod(config, {
        platform: 'ios',
        mod: 'entitlements',
        skipEmptyMod: true,
        async action(_a) {
            var _b = _a.modRequest, { nextMod } = _b, modRequest = __rest(_b, ["nextMod"]), config = __rest(_a, ["modRequest"]);
            const entitlementsPath = Entitlements_1.getEntitlementsPath(modRequest.projectRoot);
            let results = Object.assign(Object.assign({}, config), { modRequest });
            try {
                const data = plist_1.default.parse(await fs_extra_1.readFile(entitlementsPath, 'utf8'));
                // Apply all of the .entitlements values to the expo.ios.entitlements object
                // TODO: Remove this in favor of just overwriting the .entitlements with the Expo object. This will enable people to actually remove values.
                if (!config.ios) {
                    config.ios = {};
                }
                if (!config.ios.entitlements) {
                    config.ios.entitlements = {};
                }
                config.ios.entitlements = Object.assign(Object.assign({}, (data || {})), config.ios.entitlements);
                // TODO: Fix type
                results = await nextMod(Object.assign(Object.assign({}, config), { modRequest, modResults: config.ios.entitlements }));
                resolveModResults(results, modRequest.platform, modRequest.modName);
                await fs_extra_1.writeFile(entitlementsPath, plist_1.default.build(results.modResults));
            }
            catch (error) {
                console.error(`${path_1.default.basename(entitlementsPath)} mod error:`);
                throw error;
            }
            return results;
        },
    });
};
//# sourceMappingURL=compiler-plugins.js.map