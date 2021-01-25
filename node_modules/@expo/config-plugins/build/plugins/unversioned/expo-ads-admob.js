"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdMob_1 = require("../../android/AdMob");
const AdMob_2 = require("../../ios/AdMob");
const core_plugins_1 = require("../core-plugins");
const static_plugins_1 = require("../static-plugins");
const packageName = 'expo-ads-admob';
exports.withAdMob = config => {
    return static_plugins_1.withStaticPlugin(config, {
        plugin: packageName,
        // If the static plugin isn't found, use the unversioned one.
        fallback: withUnversionedAdMob,
    });
};
const withUnversionedAdMob = core_plugins_1.createRunOncePlugin(config => {
    config = AdMob_1.withAdMob(config);
    config = AdMob_2.withAdMob(config);
    return config;
}, packageName);
exports.default = exports.withAdMob;
//# sourceMappingURL=expo-ads-admob.js.map