"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getenv_1 = require("getenv");
exports.EXPO_DEBUG = getenv_1.boolish('EXPO_DEBUG', false);
/**
 * Adds the _internal object.
 *
 * @param config
 * @param projectRoot
 */
exports.withInternal = (config, internals) => {
    if (!config._internal) {
        config._internal = {};
    }
    config._internal = Object.assign(Object.assign({ isDebug: exports.EXPO_DEBUG }, config._internal), internals);
    return config;
};
//# sourceMappingURL=withInternal.js.map