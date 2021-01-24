"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const configure_splash_screen_1 = require("@expo/configure-splash-screen");
const core_plugins_1 = require("../plugins/core-plugins");
const WarningAggregator = __importStar(require("../utils/warnings"));
exports.withSplashScreen = config => {
    return core_plugins_1.withDangerousMod(config, [
        'ios',
        async (config) => {
            await setSplashScreenAsync(config, config.modRequest.projectRoot);
            return config;
        },
    ]);
};
function getSplashScreen(config) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
    if (!config.splash && !((_a = config.ios) === null || _a === void 0 ? void 0 : _a.splash)) {
        return;
    }
    const result = {
        imageResizeMode: (_f = (_d = (_c = (_b = config.ios) === null || _b === void 0 ? void 0 : _b.splash) === null || _c === void 0 ? void 0 : _c.resizeMode) !== null && _d !== void 0 ? _d : (_e = config.splash) === null || _e === void 0 ? void 0 : _e.resizeMode) !== null && _f !== void 0 ? _f : configure_splash_screen_1.SplashScreenImageResizeMode.CONTAIN,
        backgroundColor: (_l = (_j = (_h = (_g = config.ios) === null || _g === void 0 ? void 0 : _g.splash) === null || _h === void 0 ? void 0 : _h.backgroundColor) !== null && _j !== void 0 ? _j : (_k = config.splash) === null || _k === void 0 ? void 0 : _k.backgroundColor) !== null && _l !== void 0 ? _l : '#FFFFFF',
        image: (_p = (_o = (_m = config.ios) === null || _m === void 0 ? void 0 : _m.splash) === null || _o === void 0 ? void 0 : _o.image) !== null && _p !== void 0 ? _p : (_q = config.splash) === null || _q === void 0 ? void 0 : _q.image,
    };
    return result;
}
exports.getSplashScreen = getSplashScreen;
async function setSplashScreenAsync(config, projectRoot) {
    const splashScreenIsSupported = config.sdkVersion === '39.0.0' || config.sdkVersion === '40.0.0' || !config.sdkVersion;
    if (!splashScreenIsSupported) {
        WarningAggregator.addWarningIOS('splash', 'Unable to automatically configure splash screen. Please refer to the expo-splash-screen README for more information: https://github.com/expo/expo/tree/master/packages/expo-splash-screen');
        return;
    }
    const splashConfig = getSplashScreen(config);
    if (!splashConfig) {
        return;
    }
    try {
        await configure_splash_screen_1.configureIosSplashScreen(projectRoot, splashConfig);
    }
    catch (e) {
        WarningAggregator.addWarningIOS('splash', e);
    }
}
exports.setSplashScreenAsync = setSplashScreenAsync;
//# sourceMappingURL=SplashScreen.js.map