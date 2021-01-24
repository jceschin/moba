"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getCustomInfoPlistEntries(config) {
    var _a, _b;
    return (_b = (_a = config.ios) === null || _a === void 0 ? void 0 : _a.infoPlist) !== null && _b !== void 0 ? _b : {};
}
exports.getCustomInfoPlistEntries = getCustomInfoPlistEntries;
function setCustomInfoPlistEntries(config, infoPlist) {
    const entries = getCustomInfoPlistEntries(config);
    return Object.assign(Object.assign({}, infoPlist), entries);
}
exports.setCustomInfoPlistEntries = setCustomInfoPlistEntries;
//# sourceMappingURL=CustomInfoPlistEntries.js.map