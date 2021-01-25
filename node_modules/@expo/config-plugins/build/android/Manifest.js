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
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const XML = __importStar(require("../utils/XML"));
const errors_1 = require("../utils/errors");
async function writeAndroidManifestAsync(manifestPath, androidManifest) {
    const manifestXml = XML.format(androidManifest);
    await fs_extra_1.default.ensureDir(path_1.default.dirname(manifestPath));
    await fs_extra_1.default.writeFile(manifestPath, manifestXml);
}
exports.writeAndroidManifestAsync = writeAndroidManifestAsync;
async function readAndroidManifestAsync(manifestPath) {
    const xml = await XML.readXMLAsync({ path: manifestPath });
    if (!isManifest(xml)) {
        throw new Error('Invalid manifest found at: ' + manifestPath);
    }
    return xml;
}
exports.readAndroidManifestAsync = readAndroidManifestAsync;
function isManifest(xml) {
    // TODO: Maybe more validation
    return !!xml.manifest;
}
function getMainApplication(androidManifest) {
    var _a, _b, _c;
    return ((_c = (_b = (_a = androidManifest === null || androidManifest === void 0 ? void 0 : androidManifest.manifest) === null || _a === void 0 ? void 0 : _a.application) === null || _b === void 0 ? void 0 : _b.filter(e => { var _a; return ((_a = e === null || e === void 0 ? void 0 : e.$) === null || _a === void 0 ? void 0 : _a['android:name']) === '.MainApplication'; })[0]) !== null && _c !== void 0 ? _c : null);
}
exports.getMainApplication = getMainApplication;
function getMainApplicationOrThrow(androidManifest) {
    const mainApplication = getMainApplication(androidManifest);
    errors_1.assert(mainApplication, 'AndroidManifest.xml is missing the required MainApplication element');
    return mainApplication;
}
exports.getMainApplicationOrThrow = getMainApplicationOrThrow;
function getMainActivityOrThrow(androidManifest) {
    const mainActivity = getMainActivity(androidManifest);
    errors_1.assert(mainActivity, 'AndroidManifest.xml is missing the required MainActivity element');
    return mainActivity;
}
exports.getMainActivityOrThrow = getMainActivityOrThrow;
function getMainActivity(androidManifest) {
    var _a, _b, _c, _d, _e, _f;
    const mainActivity = (_e = (_d = (_c = (_b = (_a = androidManifest === null || androidManifest === void 0 ? void 0 : androidManifest.manifest) === null || _a === void 0 ? void 0 : _a.application) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.activity) === null || _d === void 0 ? void 0 : _d.filter) === null || _e === void 0 ? void 0 : _e.call(_d, (e) => e.$['android:name'] === '.MainActivity');
    return (_f = mainActivity === null || mainActivity === void 0 ? void 0 : mainActivity[0]) !== null && _f !== void 0 ? _f : null;
}
exports.getMainActivity = getMainActivity;
function addMetaDataItemToMainApplication(mainApplication, itemName, itemValue, itemType = 'value') {
    let existingMetaDataItem;
    const newItem = {
        $: prefixAndroidKeys({ name: itemName, [itemType]: itemValue }),
    };
    if (mainApplication['meta-data']) {
        existingMetaDataItem = mainApplication['meta-data'].filter((e) => e.$['android:name'] === itemName);
        if (existingMetaDataItem.length) {
            existingMetaDataItem[0].$[`android:${itemType}`] = itemValue;
        }
        else {
            mainApplication['meta-data'].push(newItem);
        }
    }
    else {
        mainApplication['meta-data'] = [newItem];
    }
    return mainApplication;
}
exports.addMetaDataItemToMainApplication = addMetaDataItemToMainApplication;
function removeMetaDataItemFromMainApplication(mainApplication, itemName) {
    const index = findMetaDataItem(mainApplication, itemName);
    if ((mainApplication === null || mainApplication === void 0 ? void 0 : mainApplication['meta-data']) && index > -1) {
        mainApplication['meta-data'].splice(index, 1);
    }
    return mainApplication;
}
exports.removeMetaDataItemFromMainApplication = removeMetaDataItemFromMainApplication;
function findApplicationSubItem(mainApplication, category, itemName) {
    const parent = mainApplication[category];
    if (Array.isArray(parent)) {
        const index = parent.findIndex((e) => e.$['android:name'] === itemName);
        return index;
    }
    return -1;
}
function findMetaDataItem(mainApplication, itemName) {
    return findApplicationSubItem(mainApplication, 'meta-data', itemName);
}
exports.findMetaDataItem = findMetaDataItem;
function findUsesLibraryItem(mainApplication, itemName) {
    return findApplicationSubItem(mainApplication, 'uses-library', itemName);
}
exports.findUsesLibraryItem = findUsesLibraryItem;
function getMainApplicationMetaDataValue(androidManifest, name) {
    var _a, _b;
    const mainApplication = getMainApplication(androidManifest);
    if (mainApplication === null || mainApplication === void 0 ? void 0 : mainApplication.hasOwnProperty('meta-data')) {
        const item = (_a = mainApplication === null || mainApplication === void 0 ? void 0 : mainApplication['meta-data']) === null || _a === void 0 ? void 0 : _a.find((e) => e.$['android:name'] === name);
        return (_b = item === null || item === void 0 ? void 0 : item.$['android:value']) !== null && _b !== void 0 ? _b : null;
    }
    return null;
}
exports.getMainApplicationMetaDataValue = getMainApplicationMetaDataValue;
function addUsesLibraryItemToMainApplication(mainApplication, item) {
    let existingMetaDataItem;
    const newItem = {
        $: prefixAndroidKeys(item),
    };
    if (mainApplication['uses-library']) {
        existingMetaDataItem = mainApplication['uses-library'].filter(e => e.$['android:name'] === item.name);
        if (existingMetaDataItem.length) {
            existingMetaDataItem[0].$ = newItem.$;
        }
        else {
            mainApplication['uses-library'].push(newItem);
        }
    }
    else {
        mainApplication['uses-library'] = [newItem];
    }
    return mainApplication;
}
exports.addUsesLibraryItemToMainApplication = addUsesLibraryItemToMainApplication;
function removeUsesLibraryItemFromMainApplication(mainApplication, itemName) {
    const index = findUsesLibraryItem(mainApplication, itemName);
    if ((mainApplication === null || mainApplication === void 0 ? void 0 : mainApplication['uses-library']) && index > -1) {
        mainApplication['uses-library'].splice(index, 1);
    }
    return mainApplication;
}
exports.removeUsesLibraryItemFromMainApplication = removeUsesLibraryItemFromMainApplication;
function prefixAndroidKeys(head) {
    // prefix all keys with `android:`
    return Object.entries(head).reduce((prev, [key, curr]) => (Object.assign(Object.assign({}, prev), { [`android:${key}`]: curr })), {});
}
exports.prefixAndroidKeys = prefixAndroidKeys;
//# sourceMappingURL=Manifest.js.map