"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const Xcodeproj_1 = require("../ios/utils/Xcodeproj");
const compiler_plugins_1 = require("./compiler-plugins");
/**
 *
 * @param projectRoot
 * @param config
 */
async function compileModsAsync(config, props) {
    config = compiler_plugins_1.withBaseMods(config);
    return await evalModsAsync(config, props);
}
exports.compileModsAsync = compileModsAsync;
function sortMods(commands, order) {
    const allKeys = commands.map(([key]) => key);
    const completeOrder = [...new Set([...order, ...allKeys])];
    const sorted = [];
    while (completeOrder.length) {
        const group = completeOrder.shift();
        const commandSet = commands.find(([key]) => key === group);
        if (commandSet) {
            sorted.push(commandSet);
        }
    }
    return sorted;
}
const orders = {
    ios: [
        // dangerous runs first
        'dangerous',
        // run the XcodeProject mod second because many plugins attempt to read from it.
        'xcodeproj',
    ],
    android: ['dangerous'],
};
/**
 * A generic plugin compiler.
 *
 * @param config
 */
async function evalModsAsync(config, { projectRoot, platforms }) {
    var _a;
    for (const [platformName, platform] of Object.entries((_a = config.mods) !== null && _a !== void 0 ? _a : {})) {
        if (platforms && !platforms.includes(platformName)) {
            continue;
        }
        let entries = Object.entries(platform);
        if (entries.length) {
            // Move dangerous item to the first position if it exists, this ensures that all dangerous code runs first.
            entries = sortMods(entries, orders[platformName]);
            const platformProjectRoot = path_1.default.join(projectRoot, platformName);
            const projectName = platformName === 'ios' ? Xcodeproj_1.getHackyProjectName(projectRoot, config) : undefined;
            for (const [modName, mod] of entries) {
                const modRequest = {
                    projectRoot,
                    projectName,
                    platformProjectRoot,
                    platform: platformName,
                    modName,
                };
                const results = await mod(Object.assign(Object.assign({}, config), { modResults: null, modRequest }));
                // Sanity check to help locate non compliant mods.
                config = compiler_plugins_1.resolveModResults(results, platformName, modName);
                // @ts-ignore: data is added for modifications
                delete config.modResults;
                // @ts-ignore: info is added for modifications
                delete config.modRequest;
            }
        }
    }
    return config;
}
exports.evalModsAsync = evalModsAsync;
//# sourceMappingURL=mod-compiler.js.map