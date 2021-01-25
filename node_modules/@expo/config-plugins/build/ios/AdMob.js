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
exports.withAdMob = ios_plugins_1.createInfoPlistPlugin(setAdMobConfig, 'withAdMob');
// NOTE(brentvatne): if the developer has installed the google ads sdk and does
// not provide an app id their app will crash. Standalone apps get around this by
// providing some default value, we will instead here assume that the user can
// do the right thing if they have installed the package. This is a slight discrepancy
// that arises in ejecting because it's possible for the package to be installed and
// not crashing in the managed workflow, then you eject and the app crashes because
// you don't have an id to fall back to.
function getGoogleMobileAdsAppId(config) {
    var _a, _b, _c;
    return (_c = (_b = (_a = config.ios) === null || _a === void 0 ? void 0 : _a.config) === null || _b === void 0 ? void 0 : _b.googleMobileAdsAppId) !== null && _c !== void 0 ? _c : null;
}
exports.getGoogleMobileAdsAppId = getGoogleMobileAdsAppId;
function setGoogleMobileAdsAppId(config, _a) {
    var { GADApplicationIdentifier } = _a, infoPlist = __rest(_a, ["GADApplicationIdentifier"]);
    const appId = getGoogleMobileAdsAppId(config);
    if (appId === null) {
        return infoPlist;
    }
    return Object.assign(Object.assign({}, infoPlist), { GADApplicationIdentifier: appId });
}
exports.setGoogleMobileAdsAppId = setGoogleMobileAdsAppId;
function setAdMobConfig(config, infoPlist) {
    infoPlist = setGoogleMobileAdsAppId(config, infoPlist);
    return infoPlist;
}
//# sourceMappingURL=AdMob.js.map