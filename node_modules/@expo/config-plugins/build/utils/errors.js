"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
class UnexpectedError extends Error {
    constructor(message) {
        super(`${message}\nPlease report this as an issue on https://github.com/expo/expo-cli/issues`);
        this.name = 'UnexpectedError';
    }
}
exports.UnexpectedError = UnexpectedError;
/**
 * Based on `JsonFileError` from `@expo/json-file`
 */
class PluginError extends Error {
    constructor(message, code, cause) {
        super(cause ? `${message}\n└─ Cause: ${cause.name}: ${cause.message}` : message);
        this.code = code;
        this.cause = cause;
        this.name = 'PluginError';
        this.isPluginError = true;
    }
}
exports.PluginError = PluginError;
function assert(value, message) {
    // TODO: Upgrade node? TypeScript isn't properly asserting values without this wrapper.
    return assert_1.default(value, message);
}
exports.assert = assert;
//# sourceMappingURL=errors.js.map