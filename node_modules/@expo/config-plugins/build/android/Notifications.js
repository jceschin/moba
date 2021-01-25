"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const image_utils_1 = require("@expo/image-utils");
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const android_plugins_1 = require("../plugins/android-plugins");
const core_plugins_1 = require("../plugins/core-plugins");
const XML_1 = require("../utils/XML");
const Colors = __importStar(require("./Colors"));
const Icon_1 = require("./Icon");
const Manifest_1 = require("./Manifest");
const Resources_1 = require("./Resources");
const BASELINE_PIXEL_SIZE = 24;
exports.META_DATA_NOTIFICATION_ICON = 'expo.modules.notifications.default_notification_icon';
exports.META_DATA_NOTIFICATION_ICON_COLOR = 'expo.modules.notifications.default_notification_color';
exports.NOTIFICATION_ICON = 'notification_icon';
exports.NOTIFICATION_ICON_RESOURCE = `@drawable/${exports.NOTIFICATION_ICON}`;
exports.NOTIFICATION_ICON_COLOR = 'notification_icon_color';
exports.NOTIFICATION_ICON_COLOR_RESOURCE = `@color/${exports.NOTIFICATION_ICON_COLOR}`;
exports.withNotificationIcons = config => {
    return core_plugins_1.withDangerousMod(config, [
        'android',
        async (config) => {
            await setNotificationIconAsync(config, config.modRequest.projectRoot);
            return config;
        },
    ]);
};
exports.withNotificationIconColor = config => {
    return core_plugins_1.withDangerousMod(config, [
        'android',
        async (config) => {
            await setNotificationIconColorAsync(config, config.modRequest.projectRoot);
            return config;
        },
    ]);
};
exports.withNotificationManifest = android_plugins_1.createAndroidManifestPlugin(setNotificationConfigAsync, 'withNotificationManifest');
function getNotificationIcon(config) {
    var _a;
    return ((_a = config.notification) === null || _a === void 0 ? void 0 : _a.icon) || null;
}
exports.getNotificationIcon = getNotificationIcon;
function getNotificationColor(config) {
    var _a;
    return ((_a = config.notification) === null || _a === void 0 ? void 0 : _a.color) || null;
}
exports.getNotificationColor = getNotificationColor;
/**
 * Applies configuration for expo-notifications, including
 * the notification icon and notification color.
 */
async function setNotificationIconAsync(config, projectRoot) {
    const icon = getNotificationIcon(config);
    if (icon) {
        await writeNotificationIconImageFilesAsync(icon, projectRoot);
    }
    else {
        await removeNotificationIconImageFilesAsync(projectRoot);
    }
}
exports.setNotificationIconAsync = setNotificationIconAsync;
async function setNotificationConfigAsync(config, manifest) {
    const icon = getNotificationIcon(config);
    const color = getNotificationColor(config);
    const mainApplication = Manifest_1.getMainApplicationOrThrow(manifest);
    if (icon) {
        Manifest_1.addMetaDataItemToMainApplication(mainApplication, exports.META_DATA_NOTIFICATION_ICON, exports.NOTIFICATION_ICON_RESOURCE, 'resource');
    }
    else {
        Manifest_1.removeMetaDataItemFromMainApplication(mainApplication, exports.META_DATA_NOTIFICATION_ICON);
    }
    if (color) {
        Manifest_1.addMetaDataItemToMainApplication(mainApplication, exports.META_DATA_NOTIFICATION_ICON_COLOR, exports.NOTIFICATION_ICON_COLOR_RESOURCE, 'resource');
    }
    else {
        Manifest_1.removeMetaDataItemFromMainApplication(mainApplication, exports.META_DATA_NOTIFICATION_ICON_COLOR);
    }
    return manifest;
}
exports.setNotificationConfigAsync = setNotificationConfigAsync;
async function setNotificationIconColorAsync(config, projectRoot) {
    const color = getNotificationColor(config);
    const colorsXmlPath = await Colors.getProjectColorsXMLPathAsync(projectRoot);
    let colorsJson = await Resources_1.readResourcesXMLAsync({ path: colorsXmlPath });
    if (color) {
        const colorItemToAdd = Resources_1.buildResourceItem({ name: exports.NOTIFICATION_ICON_COLOR, value: color });
        colorsJson = Colors.setColorItem(colorItemToAdd, colorsJson);
    }
    else {
        colorsJson = Colors.removeColorItem(exports.NOTIFICATION_ICON_COLOR, colorsJson);
    }
    await XML_1.writeXMLAsync({ path: colorsXmlPath, xml: colorsJson });
}
exports.setNotificationIconColorAsync = setNotificationIconColorAsync;
async function writeNotificationIconImageFilesAsync(icon, projectRoot) {
    await Promise.all(Object.values(Icon_1.dpiValues).map(async ({ folderName, scale }) => {
        const drawableFolderName = folderName.replace('mipmap', 'drawable');
        const dpiFolderPath = path_1.default.resolve(projectRoot, Icon_1.ANDROID_RES_PATH, drawableFolderName);
        await fs_extra_1.default.ensureDir(dpiFolderPath);
        const iconSizePx = BASELINE_PIXEL_SIZE * scale;
        try {
            const resizedIcon = (await image_utils_1.generateImageAsync({ projectRoot, cacheType: 'android-notification' }, {
                src: icon,
                width: iconSizePx,
                height: iconSizePx,
                resizeMode: 'cover',
                backgroundColor: 'transparent',
            })).source;
            await fs_extra_1.default.writeFile(path_1.default.resolve(dpiFolderPath, exports.NOTIFICATION_ICON + '.png'), resizedIcon);
        }
        catch (e) {
            throw new Error('Encountered an issue resizing Android notification icon: ' + e);
        }
    }));
}
async function removeNotificationIconImageFilesAsync(projectRoot) {
    await Promise.all(Object.values(Icon_1.dpiValues).map(async ({ folderName }) => {
        const drawableFolderName = folderName.replace('mipmap', 'drawable');
        const dpiFolderPath = path_1.default.resolve(projectRoot, Icon_1.ANDROID_RES_PATH, drawableFolderName);
        await fs_extra_1.default.remove(path_1.default.resolve(dpiFolderPath, exports.NOTIFICATION_ICON + '.png'));
    }));
}
//# sourceMappingURL=Notifications.js.map