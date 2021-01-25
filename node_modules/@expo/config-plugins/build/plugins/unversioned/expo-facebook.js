"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Facebook_1 = require("../../android/Facebook");
const Facebook_2 = require("../../ios/Facebook");
const core_plugins_1 = require("../core-plugins");
const static_plugins_1 = require("../static-plugins");
// Local unversioned facebook plugin
const packageName = 'expo-facebook';
exports.withFacebook = config => {
    return static_plugins_1.withStaticPlugin(config, {
        plugin: packageName,
        // If the static plugin isn't found, use the unversioned one.
        fallback: withUnversionedFacebook,
    });
};
const withUnversionedFacebook = core_plugins_1.createRunOncePlugin(config => {
    config = Facebook_1.withFacebookManifest(config);
    config = Facebook_1.withFacebookAppIdString(config);
    config = Facebook_2.withFacebook(config);
    return config;
}, packageName);
exports.default = exports.withFacebook;
//# sourceMappingURL=expo-facebook.js.map