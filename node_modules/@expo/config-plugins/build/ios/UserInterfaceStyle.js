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
exports.withUserInterfaceStyle = ios_plugins_1.createInfoPlistPlugin(setUserInterfaceStyle, 'withUserInterfaceStyle');
function getUserInterfaceStyle(config) {
    var _a, _b, _c;
    return (_c = (_b = (_a = config.ios) === null || _a === void 0 ? void 0 : _a.userInterfaceStyle) !== null && _b !== void 0 ? _b : config.userInterfaceStyle) !== null && _c !== void 0 ? _c : null;
}
exports.getUserInterfaceStyle = getUserInterfaceStyle;
function setUserInterfaceStyle(config, _a) {
    var { UIUserInterfaceStyle } = _a, infoPlist = __rest(_a, ["UIUserInterfaceStyle"]);
    const userInterfaceStyle = getUserInterfaceStyle(config);
    const style = mapUserInterfaceStyleForInfoPlist(userInterfaceStyle);
    if (!style) {
        return infoPlist;
    }
    return Object.assign(Object.assign({}, infoPlist), { UIUserInterfaceStyle: style });
}
exports.setUserInterfaceStyle = setUserInterfaceStyle;
function mapUserInterfaceStyleForInfoPlist(userInterfaceStyle) {
    switch (userInterfaceStyle) {
        case 'light':
            return 'Light';
        case 'dark':
            return 'Dark';
        case 'automatic':
            return 'Automatic';
    }
    return null;
}
//# sourceMappingURL=UserInterfaceStyle.js.map