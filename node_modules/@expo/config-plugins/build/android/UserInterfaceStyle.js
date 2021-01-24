"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const android_plugins_1 = require("../plugins/android-plugins");
const WarningAggregator = __importStar(require("../utils/warnings"));
const Manifest_1 = require("./Manifest");
exports.CONFIG_CHANGES_ATTRIBUTE = 'android:configChanges';
exports.ON_CONFIGURATION_CHANGED = `
public class MainActivity extends ReactActivity {

    // Added automatically by Expo Config
    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        Intent intent = new Intent("onConfigurationChanged");
        intent.putExtra("newConfig", newConfig);
        sendBroadcast(intent);
    }
`;
exports.withUiModeManifest = android_plugins_1.createAndroidManifestPlugin(setUiModeAndroidManifest, 'withUiModeManifest');
exports.withUiModeMainActivity = config => {
    return android_plugins_1.withMainActivity(config, config => {
        if (config.modResults.language === 'java') {
            config.modResults.contents = addOnConfigurationChangedMainActivity(config, config.modResults.contents);
        }
        else {
            WarningAggregator.addWarningAndroid('android-userInterfaceStyle', `Cannot automatically configure MainActivity if it's not java`);
        }
        return config;
    });
};
function getUserInterfaceStyle(config) {
    var _a, _b, _c;
    return (_c = (_b = (_a = config.android) === null || _a === void 0 ? void 0 : _a.userInterfaceStyle) !== null && _b !== void 0 ? _b : config.userInterfaceStyle) !== null && _c !== void 0 ? _c : null;
}
exports.getUserInterfaceStyle = getUserInterfaceStyle;
function setUiModeAndroidManifest(config, androidManifest) {
    const userInterfaceStyle = getUserInterfaceStyle(config);
    // TODO: Remove this if we decide to remove any uiMode configuration when not specified
    if (!userInterfaceStyle) {
        return androidManifest;
    }
    const mainActivity = Manifest_1.getMainActivityOrThrow(androidManifest);
    mainActivity.$[exports.CONFIG_CHANGES_ATTRIBUTE] =
        'keyboard|keyboardHidden|orientation|screenSize|uiMode';
    return androidManifest;
}
exports.setUiModeAndroidManifest = setUiModeAndroidManifest;
function addOnConfigurationChangedMainActivity(config, mainActivity) {
    var _a;
    const userInterfaceStyle = getUserInterfaceStyle(config);
    if (!userInterfaceStyle) {
        return mainActivity;
    }
    // Cruzan: this is not ideal, but I'm not sure of a better way to handle writing to MainActivity.java
    if ((_a = mainActivity.match(`onConfigurationChanged`)) === null || _a === void 0 ? void 0 : _a.length) {
        return mainActivity;
    }
    const MainActivityWithImports = addJavaImports(mainActivity, [
        'android.content.Intent',
        'android.content.res.Configuration',
    ]);
    const pattern = new RegExp(`public class MainActivity extends ReactActivity {`);
    return MainActivityWithImports.replace(pattern, exports.ON_CONFIGURATION_CHANGED);
}
exports.addOnConfigurationChangedMainActivity = addOnConfigurationChangedMainActivity;
// TODO: we should have a generic utility for doing this
function addJavaImports(javaSource, javaImports) {
    const lines = javaSource.split('\n');
    const lineIndexWithPackageDeclaration = lines.findIndex(line => line.match(/^package .*;$/));
    for (const javaImport of javaImports) {
        if (!javaSource.includes(javaImport)) {
            const importStatement = `import ${javaImport};`;
            lines.splice(lineIndexWithPackageDeclaration + 1, 0, importStatement);
        }
    }
    return lines.join('\n');
}
//# sourceMappingURL=UserInterfaceStyle.js.map