"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SplashScreen_1 = require("../../android/SplashScreen");
const SplashScreen_2 = require("../../ios/SplashScreen");
const core_plugins_1 = require("../core-plugins");
const static_plugins_1 = require("../static-plugins");
const packageName = 'expo-splash-screen';
exports.withSplashScreen = config => {
    return static_plugins_1.withStaticPlugin(config, {
        plugin: packageName,
        // If the static plugin isn't found, use the unversioned one.
        fallback: withUnversionedSplashScreen,
    });
};
const withUnversionedSplashScreen = core_plugins_1.createRunOncePlugin(config => {
    config = SplashScreen_1.withSplashScreen(config);
    config = SplashScreen_2.withSplashScreen(config);
    return config;
}, packageName);
exports.default = exports.withSplashScreen;
//# sourceMappingURL=expo-splash-screen.js.map