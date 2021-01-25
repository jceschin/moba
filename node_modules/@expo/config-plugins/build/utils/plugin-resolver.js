"use strict";
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
const find_up_1 = __importDefault(require("find-up"));
const path = __importStar(require("path"));
const resolve_from_1 = __importDefault(require("resolve-from"));
const errors_1 = require("./errors");
const modules_1 = require("./modules");
// Default plugin entry file name.
exports.pluginFileName = 'app.plugin.js';
function findUpPackageJson(root) {
    const packageJson = find_up_1.default.sync('package.json', { cwd: root });
    errors_1.assert(packageJson, `No package.json found for module "${root}"`);
    return packageJson;
}
function resolvePluginForModule(projectRoot, modulePath) {
    const resolved = resolve_from_1.default(projectRoot, modulePath);
    errors_1.assert(resolved, `Failed to resolve plugin for module "${modulePath}" relative to "${projectRoot}"`);
    // If the modulePath is something like `@bacon/package/index.js` or `expo-foo/build/app`
    // then skip resolving the module `app.plugin.js`
    if (moduleNameIsDirectFileReference(modulePath)) {
        return resolved;
    }
    return findUpPlugin(resolved);
}
// TODO: Test windows
function pathIsFilePath(name) {
    // Matches lines starting with: . / ~/
    return !!name.match(/^(\.|~\/|\/)/g);
}
function moduleNameIsDirectFileReference(name) {
    var _a;
    if (pathIsFilePath(name)) {
        return true;
    }
    const slashCount = (_a = name.split(path.sep)) === null || _a === void 0 ? void 0 : _a.length;
    // Orgs (like @expo/config ) should have more than one slash to be a direct file.
    if (name.startsWith('@')) {
        return slashCount > 2;
    }
    // Regular packages should be considered direct reference if they have more than one slash.
    return slashCount > 1;
}
exports.moduleNameIsDirectFileReference = moduleNameIsDirectFileReference;
function resolveExpoPluginFile(root) {
    // Find the expo plugin root file
    const pluginModuleFile = resolve_from_1.default.silent(root, 
    // use ./ so it isn't resolved as a node module
    `./${exports.pluginFileName}`);
    // If the default expo plugin file exists use it.
    if (pluginModuleFile && modules_1.fileExists(pluginModuleFile)) {
        return pluginModuleFile;
    }
    return null;
}
function findUpPlugin(root) {
    var _a;
    // Get the closest package.json to the node module
    const packageJson = findUpPackageJson(root);
    // resolve the root folder for the node module
    const moduleRoot = path.dirname(packageJson);
    // use whatever the initial resolved file was ex: `node_modules/my-package/index.js` or `./something.js`
    return (_a = resolveExpoPluginFile(moduleRoot)) !== null && _a !== void 0 ? _a : root;
}
function normalizeStaticPlugin(plugin) {
    if (Array.isArray(plugin)) {
        errors_1.assert(plugin.length > 0 && plugin.length < 3, `Wrong number of arguments provided for static config plugin, expected either 1 or 2, got ${plugin.length}`);
        return plugin;
    }
    return [plugin, undefined];
}
exports.normalizeStaticPlugin = normalizeStaticPlugin;
function assertInternalProjectRoot(projectRoot) {
    errors_1.assert(projectRoot, `Unexpected: Config \`_internal.projectRoot\` isn't defined by expo-cli, this is a bug.`);
}
exports.assertInternalProjectRoot = assertInternalProjectRoot;
// Resolve the module function and assert type
function resolveConfigPluginFunction(projectRoot, pluginModulePath) {
    const moduleFilePath = resolvePluginForModule(projectRoot, pluginModulePath);
    const result = requirePluginFile(moduleFilePath);
    return resolveConfigPluginExport(result, moduleFilePath);
}
exports.resolveConfigPluginFunction = resolveConfigPluginFunction;
/**
 * - Resolve the exported contents of an Expo config (be it default or module.exports)
 * - Assert no promise exports
 * - Return config type
 * - Serialize config
 *
 * @param result
 * @param configFile
 */
function resolveConfigPluginExport(result, configFile) {
    if (result.default != null) {
        result = result.default;
    }
    if (typeof result !== 'function') {
        throw new errors_1.PluginError(`Plugin file ${configFile} must export a function. Learn more: https://github.com/expo/expo-cli/tree/master/packages/config-plugins#creating-a-plugin`, 'INVALID_PLUGIN_TYPE');
    }
    return result;
}
exports.resolveConfigPluginExport = resolveConfigPluginExport;
function requirePluginFile(filePath) {
    try {
        return require(filePath);
    }
    catch (error) {
        // TODO: Improve error messages
        throw error;
    }
}
//# sourceMappingURL=plugin-resolver.js.map