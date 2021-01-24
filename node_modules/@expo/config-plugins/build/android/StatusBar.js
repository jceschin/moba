"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_plugins_1 = require("../plugins/core-plugins");
const XML_1 = require("../utils/XML");
const WarningAggregator = __importStar(require("../utils/warnings"));
const Colors_1 = require("./Colors");
const Resources_1 = require("./Resources");
const Styles_1 = require("./Styles");
const COLOR_PRIMARY_DARK_KEY = 'colorPrimaryDark';
const WINDOW_TRANSLUCENT_STATUS = 'android:windowTranslucentStatus';
const WINDOW_LIGHT_STATUS_BAR = 'android:windowLightStatusBar';
exports.withStatusBar = config => {
    return core_plugins_1.withDangerousMod(config, [
        'android',
        async (config) => {
            await setStatusBarConfig(config, config.modRequest.projectRoot);
            return config;
        },
    ]);
};
function getStatusBarColor(config) {
    var _a;
    if (config.androidStatusBarColor != null) {
        WarningAggregator.addWarningAndroid('status-bar', '`androidStatusBarColor` is deprecated, use `androidStatusBar.backgroundColor` instead.');
    }
    return ((_a = config.androidStatusBar) === null || _a === void 0 ? void 0 : _a.backgroundColor) || 'translucent';
}
exports.getStatusBarColor = getStatusBarColor;
function getStatusBarStyle(config) {
    var _a;
    return ((_a = config.androidStatusBar) === null || _a === void 0 ? void 0 : _a.barStyle) || 'light-content';
}
exports.getStatusBarStyle = getStatusBarStyle;
async function setStatusBarConfig(config, projectRoot) {
    const hexString = getStatusBarColor(config);
    const statusBarStyle = getStatusBarStyle(config);
    const stylesPath = await Styles_1.getProjectStylesXMLPathAsync(projectRoot);
    const colorsPath = await Colors_1.getProjectColorsXMLPathAsync(projectRoot);
    let stylesJSON = await Resources_1.readResourcesXMLAsync({ path: stylesPath });
    let colorsJSON = await Resources_1.readResourcesXMLAsync({ path: colorsPath });
    let styleItemToAdd;
    if (hexString === 'translucent') {
        // translucent status bar set in theme
        styleItemToAdd = Resources_1.buildResourceItem({ name: WINDOW_TRANSLUCENT_STATUS, value: 'true' });
    }
    else {
        // Need to add a color key to colors.xml to use in styles.xml
        const colorItemToAdd = Resources_1.buildResourceItem({ name: COLOR_PRIMARY_DARK_KEY, value: hexString });
        colorsJSON = Colors_1.setColorItem(colorItemToAdd, colorsJSON);
        styleItemToAdd = Resources_1.buildResourceItem({
            name: COLOR_PRIMARY_DARK_KEY,
            value: `@color/${COLOR_PRIMARY_DARK_KEY}`,
        });
    }
    // Default is light-content, don't need to do anything to set it
    if (statusBarStyle === 'dark-content') {
        const statusBarStyleItem = Resources_1.buildResourceItem({
            name: WINDOW_LIGHT_STATUS_BAR,
            value: `true`,
        });
        stylesJSON = Styles_1.setStylesItem({
            item: statusBarStyleItem,
            xml: stylesJSON,
            parent: { name: 'AppTheme', parent: 'Theme.AppCompat.Light.NoActionBar' },
        });
    }
    stylesJSON = Styles_1.setStylesItem({
        item: styleItemToAdd,
        xml: stylesJSON,
        parent: { name: 'AppTheme', parent: 'Theme.AppCompat.Light.NoActionBar' },
    });
    try {
        await Promise.all([
            XML_1.writeXMLAsync({ path: colorsPath, xml: colorsJSON }),
            XML_1.writeXMLAsync({ path: stylesPath, xml: stylesJSON }),
        ]);
    }
    catch (e) {
        throw new Error(`Error setting Android status bar config. Cannot write colors.xml to ${colorsPath}, or styles.xml to ${stylesPath}.`);
    }
    return true;
}
exports.setStatusBarConfig = setStatusBarConfig;
//# sourceMappingURL=StatusBar.js.map