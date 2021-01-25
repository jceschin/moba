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
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const getenv_1 = require("getenv");
const errors_1 = require("../utils/errors");
const history_1 = require("../utils/history");
const static_plugins_1 = require("./static-plugins");
const EXPO_DEBUG = getenv_1.boolish('EXPO_DEBUG', false);
/**
 * Resolves a list of plugins.
 *
 * @param config exported config
 * @param plugins list of config config plugins to apply to the exported config
 */
exports.withPlugins = (config, plugins) => {
    errors_1.assert(Array.isArray(plugins), 'withPlugins expected a valid array of plugins or plugin module paths');
    return plugins.reduce((prev, plugin) => {
        return static_plugins_1.withStaticPlugin(prev, { plugin });
    }, config);
};
/**
 * Prevents the same plugin from being run twice.
 * Used for migrating from unversioned expo config plugins to versioned plugins.
 *
 * @param config
 * @param name
 */
exports.withRunOnce = (config, { plugin, name, version }) => {
    // Detect if a plugin has already been run on this config.
    if (history_1.getHistoryItem(config, name)) {
        return config;
    }
    // Push the history item so duplicates cannot be run.
    config = history_1.addHistoryItem(config, { name, version });
    return plugin(config);
};
/**
 * Helper method for creating mods from existing config functions.
 *
 * @param action
 */
function createRunOncePlugin(plugin, name, version) {
    return (config, props) => {
        return exports.withRunOnce(config, { plugin: config => plugin(config, props), name, version });
    };
}
exports.createRunOncePlugin = createRunOncePlugin;
/**
 * Mods that don't modify any data, all unresolved functionality is performed inside a dangerous mod.
 * All dangerous mods run first before other mods.
 *
 * @param config
 * @param platform
 * @param action
 */
exports.withDangerousMod = (config, [platform, action]) => {
    return withExtendedMod(config, {
        platform,
        mod: 'dangerous',
        action,
    });
};
/**
 * Plugin to extend a mod function in the plugins config.
 *
 * @param config exported config
 * @param platform platform to target (ios or android)
 * @param mod name of the platform function to extend
 * @param action method to run on the mod when the config is compiled
 */
function withExtendedMod(config, { platform, mod, action, }) {
    return withInterceptedMod(config, {
        platform,
        mod,
        async action(_a) {
            var _b = _a.modRequest, { nextMod } = _b, modRequest = __rest(_b, ["nextMod"]), { modResults } = _a, config = __rest(_a, ["modRequest", "modResults"]);
            const results = await action(Object.assign({ modRequest, modResults: modResults }, config));
            return nextMod(results);
        },
    });
}
exports.withExtendedMod = withExtendedMod;
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
function withInterceptedMod(config, { platform, mod, action, skipEmptyMod, }) {
    var _a, _b;
    if (!config.mods) {
        config.mods = {};
    }
    if (!config.mods[platform]) {
        config.mods[platform] = {};
    }
    let interceptedMod = config.mods[platform][mod];
    // No existing mod to intercept
    if (!interceptedMod) {
        if (skipEmptyMod) {
            // Skip running the action
            return config;
        }
        // Use a noop mod and continue
        const noopMod = config => config;
        interceptedMod = noopMod;
    }
    // Create a stack trace for debugging ahead of time
    let debugTrace = '';
    // Use the possibly user defined value. Otherwise fallback to the env variable.
    // We support the env variable because user mods won't have _internal defined in time.
    const isDebug = (_b = (_a = config._internal) === null || _a === void 0 ? void 0 : _a.isDebug) !== null && _b !== void 0 ? _b : EXPO_DEBUG;
    if (isDebug) {
        // Get a stack trace via the Error API
        const stack = new Error().stack;
        // Format the stack trace to create the debug log
        debugTrace = getDebugPluginStackFromStackTrace(stack);
        const modStack = chalk_1.default.bold(`${platform}.${mod}`);
        debugTrace = `${modStack}: ${debugTrace}`;
    }
    async function interceptingMod(_a) {
        var { modRequest } = _a, config = __rest(_a, ["modRequest"]);
        if (isDebug) {
            // In debug mod, log the plugin stack in the order which they were invoked
            console.log(debugTrace);
        }
        return action(Object.assign(Object.assign({}, config), { modRequest: Object.assign(Object.assign({}, modRequest), { nextMod: interceptedMod }) }));
    }
    config.mods[platform][mod] = interceptingMod;
    return config;
}
exports.withInterceptedMod = withInterceptedMod;
function getDebugPluginStackFromStackTrace(stacktrace) {
    if (!stacktrace) {
        return '';
    }
    const treeStackLines = [];
    for (const line of stacktrace.split('\n')) {
        const [first, second] = line.trim().split(' ');
        if (first === 'at') {
            treeStackLines.push(second);
        }
    }
    const plugins = treeStackLines
        .map(first => {
        // Match the first part of the stack trace against the plugin naming convention
        // "with" followed by a capital letter.
        const match = first === null || first === void 0 ? void 0 : first.match(/(\bwith[A-Z].*?\b)/g);
        if (match === null || match === void 0 ? void 0 : match.length) {
            // Return the plugin name
            return match[0];
        }
        return null;
    })
        .filter(Boolean);
    // redundant as all debug logs are captured in withInterceptedMod
    if (plugins[0] === 'withInterceptedMod') {
        plugins.shift();
    }
    const commonPlugins = ['withPlugins', 'withExtendedMod'];
    return (plugins
        .reverse()
        .map((pluginName, index) => {
        // Base mods indicate a logical section.
        if (pluginName.includes('BaseMod')) {
            pluginName = chalk_1.default.bold(pluginName);
        }
        // highlight dangerous mods
        if (pluginName.toLowerCase().includes('danger')) {
            pluginName = chalk_1.default.red(pluginName);
        }
        if (index === 0) {
            return chalk_1.default.blue(pluginName);
        }
        else if (commonPlugins.includes(pluginName)) {
            // Common mod names often clutter up the logs, dim them out
            return chalk_1.default.dim(pluginName);
        }
        return pluginName;
    })
        // Join the results:
        // withExpoAndroidPlugins ➜ withPlugins ➜ withIcons ➜ withDangerousMod ➜ withExtendedMod
        .join(' ➜ '));
}
//# sourceMappingURL=core-plugins.js.map