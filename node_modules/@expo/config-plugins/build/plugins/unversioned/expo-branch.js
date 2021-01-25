"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Branch_1 = require("../../android/Branch");
const Branch_2 = require("../../ios/Branch");
const core_plugins_1 = require("../core-plugins");
const static_plugins_1 = require("../static-plugins");
const packageName = 'expo-branch';
exports.withBranch = config => {
    return static_plugins_1.withStaticPlugin(config, {
        plugin: packageName,
        // If the static plugin isn't found, use the unversioned one.
        fallback: withUnversionedBranch,
    });
};
const withUnversionedBranch = core_plugins_1.createRunOncePlugin(config => {
    config = Branch_1.withBranch(config);
    config = Branch_2.withBranch(config);
    return config;
}, packageName);
exports.default = exports.withBranch;
//# sourceMappingURL=expo-branch.js.map