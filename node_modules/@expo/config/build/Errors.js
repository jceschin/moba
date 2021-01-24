"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
/**
 * Based on `JsonFileError` from `@expo/json-file`
 */
class ConfigError extends Error {
    constructor(message, code, cause) {
        super(cause ? `${message}\n└─ Cause: ${cause.name}: ${cause.message}` : message);
        this.code = code;
        this.cause = cause;
        this.name = 'ConfigError';
        this.isConfigError = true;
    }
}
exports.ConfigError = ConfigError;
function assert(value, message) {
    // TODO: Upgrade node? TypeScript isn't properly asserting values without this wrapper.
    return assert_1.default(value, message);
}
exports.assert = assert;
//# sourceMappingURL=Errors.js.map