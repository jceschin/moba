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
exports.withDisplayName = ios_plugins_1.createInfoPlistPlugin(setDisplayName, 'withDisplayName');
exports.withName = ios_plugins_1.createInfoPlistPlugin(setName, 'withName');
function getName(config) {
    return typeof config.name === 'string' ? config.name : null;
}
exports.getName = getName;
/**
 * CFBundleDisplayName is used for most things: the name on the home screen, in
 * notifications, and others.
 */
function setDisplayName(configOrName, _a) {
    var { CFBundleDisplayName } = _a, infoPlist = __rest(_a, ["CFBundleDisplayName"]);
    let name = null;
    if (typeof configOrName === 'string') {
        name = configOrName;
    }
    else {
        name = getName(configOrName);
    }
    if (!name) {
        return infoPlist;
    }
    return Object.assign(Object.assign({}, infoPlist), { CFBundleDisplayName: name });
}
exports.setDisplayName = setDisplayName;
/**
 * CFBundleName is recommended to be 16 chars or less and is used in lists, eg:
 * sometimes on the App Store
 */
function setName(config, _a) {
    var { CFBundleName } = _a, infoPlist = __rest(_a, ["CFBundleName"]);
    const name = getName(config);
    if (!name) {
        return infoPlist;
    }
    return Object.assign(Object.assign({}, infoPlist), { CFBundleName: name });
}
exports.setName = setName;
//# sourceMappingURL=Name.js.map