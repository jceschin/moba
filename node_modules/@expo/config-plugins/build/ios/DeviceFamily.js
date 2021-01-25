"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ios_plugins_1 = require("../plugins/ios-plugins");
const WarningAggregator = __importStar(require("../utils/warnings"));
exports.withDeviceFamily = config => {
    return ios_plugins_1.withXcodeProject(config, async (config) => {
        config.modResults = await setDeviceFamily(config, {
            project: config.modResults,
        });
        return config;
    });
};
function getSupportsTablet(config) {
    var _a;
    return !!((_a = config.ios) === null || _a === void 0 ? void 0 : _a.supportsTablet);
}
exports.getSupportsTablet = getSupportsTablet;
function getIsTabletOnly(config) {
    var _a;
    return !!((_a = config === null || config === void 0 ? void 0 : config.ios) === null || _a === void 0 ? void 0 : _a.isTabletOnly);
}
exports.getIsTabletOnly = getIsTabletOnly;
function getDeviceFamilies(config) {
    var _a;
    const supportsTablet = getSupportsTablet(config);
    const isTabletOnly = getIsTabletOnly(config);
    if (isTabletOnly && ((_a = config.ios) === null || _a === void 0 ? void 0 : _a.supportsTablet) === false) {
        WarningAggregator.addWarningIOS('device-family', `Found contradictory values: \`{ ios: { isTabletOnly: true, supportsTablet: false } }\`. Using \`{ isTabletOnly: true }\`.`);
    }
    // 1 is iPhone, 2 is iPad
    if (isTabletOnly) {
        return [2];
    }
    else if (supportsTablet) {
        return [1, 2];
    }
    else {
        // is iPhone only
        return [1];
    }
}
exports.getDeviceFamilies = getDeviceFamilies;
/**
 * Wrapping the families in double quotes is the only way to set a value with a comma in it.
 *
 * @param deviceFamilies
 */
function formatDeviceFamilies(deviceFamilies) {
    return `"${deviceFamilies.join(',')}"`;
}
exports.formatDeviceFamilies = formatDeviceFamilies;
/**
 * Add to pbxproj under TARGETED_DEVICE_FAMILY
 */
function setDeviceFamily(config, { project }) {
    const deviceFamilies = formatDeviceFamilies(getDeviceFamilies(config));
    const configurations = project.pbxXCBuildConfigurationSection();
    // @ts-ignore
    for (const { buildSettings } of Object.values(configurations || {})) {
        // Guessing that this is the best way to emulate Xcode.
        // Using `project.addToBuildSettings` modifies too many targets.
        if (typeof (buildSettings === null || buildSettings === void 0 ? void 0 : buildSettings.PRODUCT_NAME) !== 'undefined') {
            buildSettings.TARGETED_DEVICE_FAMILY = deviceFamilies;
        }
    }
    return project;
}
exports.setDeviceFamily = setDeviceFamily;
//# sourceMappingURL=DeviceFamily.js.map