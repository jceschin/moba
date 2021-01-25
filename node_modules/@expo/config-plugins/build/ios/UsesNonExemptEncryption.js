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
Object.defineProperty(exports, "__esModule", { value: true });
const ios_plugins_1 = require("../plugins/ios-plugins");
exports.withUsesNonExemptEncryption = ios_plugins_1.createInfoPlistPlugin(setUsesNonExemptEncryption, 'withUsesNonExemptEncryption');
function getUsesNonExemptEncryption(config) {
    var _a, _b, _c;
    return (_c = (_b = (_a = config === null || config === void 0 ? void 0 : config.ios) === null || _a === void 0 ? void 0 : _a.config) === null || _b === void 0 ? void 0 : _b.usesNonExemptEncryption) !== null && _c !== void 0 ? _c : null;
}
exports.getUsesNonExemptEncryption = getUsesNonExemptEncryption;
function setUsesNonExemptEncryption(config, _a) {
    var { ITSAppUsesNonExemptEncryption } = _a, infoPlist = __rest(_a, ["ITSAppUsesNonExemptEncryption"]);
    const usesNonExemptEncryption = getUsesNonExemptEncryption(config);
    // Make no changes if the key is left blank
    if (usesNonExemptEncryption === null) {
        return infoPlist;
    }
    return Object.assign(Object.assign({}, infoPlist), { ITSAppUsesNonExemptEncryption: usesNonExemptEncryption });
}
exports.setUsesNonExemptEncryption = setUsesNonExemptEncryption;
//# sourceMappingURL=UsesNonExemptEncryption.js.map