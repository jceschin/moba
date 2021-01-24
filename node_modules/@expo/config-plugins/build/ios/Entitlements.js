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
const slash_1 = __importDefault(require("slash"));
const ios_plugins_1 = require("../plugins/ios-plugins");
const WarningAggregator = __importStar(require("../utils/warnings"));
const Paths = __importStar(require("./Paths"));
const Xcodeproj_1 = require("./utils/Xcodeproj");
exports.withAccessesContactNotes = ios_plugins_1.createEntitlementsPlugin(setAccessesContactNotes, 'withAccessesContactNotes');
exports.withAssociatedDomains = ios_plugins_1.createEntitlementsPlugin(setAssociatedDomains, 'withAssociatedDomains');
exports.withAppleSignInEntitlement = ios_plugins_1.createEntitlementsPlugin(setAppleSignInEntitlement, 'withAppleSignInEntitlement');
exports.withICloudEntitlement = (config, { appleTeamId }) => {
    return ios_plugins_1.withEntitlementsPlist(config, config => {
        config.modResults = setICloudEntitlement(config, config.modResults, appleTeamId);
        return config;
    });
};
// TODO: should it be possible to turn off these entitlements by setting false in app.json and running apply
function getConfigEntitlements(config) {
    var _a, _b;
    return (_b = (_a = config.ios) === null || _a === void 0 ? void 0 : _a.entitlements) !== null && _b !== void 0 ? _b : {};
}
exports.getConfigEntitlements = getConfigEntitlements;
function setCustomEntitlementsEntries(config, entitlements) {
    const entries = getConfigEntitlements(config);
    return Object.assign(Object.assign({}, entitlements), entries);
}
exports.setCustomEntitlementsEntries = setCustomEntitlementsEntries;
function setICloudEntitlement(config, entitlementsPlist, appleTeamId) {
    var _a;
    if ((_a = config.ios) === null || _a === void 0 ? void 0 : _a.usesIcloudStorage) {
        // TODO: need access to the appleTeamId for this one!
        WarningAggregator.addWarningIOS('ios.usesIcloudStorage', 'Enable the iCloud Storage Entitlement from the Capabilities tab in your Xcode project.'
        // TODO: add a link to a docs page with more information on how to do this
        );
    }
    return entitlementsPlist;
}
exports.setICloudEntitlement = setICloudEntitlement;
function setAppleSignInEntitlement(config, _a) {
    var _b;
    var { 'com.apple.developer.applesignin': _ } = _a, entitlementsPlist = __rest(_a, ['com.apple.developer.applesignin']);
    if ((_b = config.ios) === null || _b === void 0 ? void 0 : _b.usesAppleSignIn) {
        return Object.assign(Object.assign({}, entitlementsPlist), { 'com.apple.developer.applesignin': ['Default'] });
    }
    return entitlementsPlist;
}
exports.setAppleSignInEntitlement = setAppleSignInEntitlement;
function setAccessesContactNotes(config, _a) {
    var _b;
    var { 'com.apple.developer.contacts.notes': _ } = _a, entitlementsPlist = __rest(_a, ['com.apple.developer.contacts.notes']);
    if ((_b = config.ios) === null || _b === void 0 ? void 0 : _b.accessesContactNotes) {
        return Object.assign(Object.assign({}, entitlementsPlist), { 'com.apple.developer.contacts.notes': config.ios.accessesContactNotes });
    }
    return entitlementsPlist;
}
exports.setAccessesContactNotes = setAccessesContactNotes;
function setAssociatedDomains(config, _a) {
    var _b;
    var { 'com.apple.developer.associated-domains': _ } = _a, entitlementsPlist = __rest(_a, ['com.apple.developer.associated-domains']);
    if ((_b = config.ios) === null || _b === void 0 ? void 0 : _b.associatedDomains) {
        return Object.assign(Object.assign({}, entitlementsPlist), { 'com.apple.developer.associated-domains': config.ios.associatedDomains });
    }
    return entitlementsPlist;
}
exports.setAssociatedDomains = setAssociatedDomains;
function getEntitlementsPath(projectRoot) {
    const paths = Paths.getAllEntitlementsPaths(projectRoot);
    let targetPath = null;
    /**
     * Add file to pbxproj under CODE_SIGN_ENTITLEMENTS
     */
    const project = Xcodeproj_1.getPbxproj(projectRoot);
    const projectName = Xcodeproj_1.getProjectName(projectRoot);
    const productName = Xcodeproj_1.getProductName(project);
    // Use posix formatted path, even on Windows
    const entitlementsRelativePath = slash_1.default(path_1.default.join(projectName, `${productName}.entitlements`));
    const entitlementsPath = slash_1.default(path_1.default.normalize(path_1.default.join(projectRoot, 'ios', entitlementsRelativePath)));
    const pathsToDelete = [];
    while (paths.length) {
        const last = slash_1.default(path_1.default.normalize(paths.pop()));
        if (last !== entitlementsPath) {
            pathsToDelete.push(last);
        }
        else {
            targetPath = last;
        }
    }
    // Create a new entitlements file
    if (!targetPath) {
        targetPath = entitlementsPath;
        // Use the default template
        let template = ENTITLEMENTS_TEMPLATE;
        // If an old entitlements file exists, copy it's contents into the new file.
        if (pathsToDelete.length) {
            // Get the last entitlements file and use it as the template
            const last = pathsToDelete[pathsToDelete.length - 1];
            template = fs_extra_1.default.readFileSync(last, 'utf8');
        }
        fs_extra_1.default.ensureDirSync(path_1.default.dirname(entitlementsPath));
        fs_extra_1.default.writeFileSync(entitlementsPath, template);
        Object.entries(project.pbxXCBuildConfigurationSection())
            .filter(Xcodeproj_1.isNotComment)
            .filter(Xcodeproj_1.isBuildConfig)
            .filter(Xcodeproj_1.isNotTestHost)
            .forEach(({ 1: { buildSettings } }) => {
            buildSettings.CODE_SIGN_ENTITLEMENTS = entitlementsRelativePath;
        });
        fs_extra_1.default.writeFileSync(project.filepath, project.writeSync());
    }
    // Clean up others
    deleteEntitlementsFiles(pathsToDelete);
    return entitlementsPath;
}
exports.getEntitlementsPath = getEntitlementsPath;
function deleteEntitlementsFiles(entitlementsPaths) {
    for (const path of entitlementsPaths) {
        fs_extra_1.default.removeSync(path);
    }
}
const ENTITLEMENTS_TEMPLATE = `
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
<key>aps-environment</key>
<string>development</string>
</dict>
</plist>
`;
//# sourceMappingURL=Entitlements.js.map