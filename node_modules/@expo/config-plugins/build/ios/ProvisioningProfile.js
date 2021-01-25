"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const Xcodeproj_1 = require("./utils/Xcodeproj");
function setProvisioningProfileForPbxproj(projectRoot, { targetName, profileName, appleTeamId }) {
    const project = Xcodeproj_1.getPbxproj(projectRoot);
    const [nativeTargetId, nativeTarget] = targetName
        ? Xcodeproj_1.findNativeTargetByName(project, targetName)
        : Xcodeproj_1.findFirstNativeTarget(project);
    Xcodeproj_1.getBuildConfigurationForId(project, nativeTarget.buildConfigurationList)
        .filter(([, item]) => item.buildSettings.PRODUCT_NAME)
        .forEach(([, item]) => {
        item.buildSettings.PROVISIONING_PROFILE_SPECIFIER = `"${profileName}"`;
        item.buildSettings.DEVELOPMENT_TEAM = appleTeamId;
        item.buildSettings.CODE_SIGN_IDENTITY = '"iPhone Distribution"';
        item.buildSettings.CODE_SIGN_STYLE = 'Manual';
    });
    Object.entries(Xcodeproj_1.getProjectSection(project))
        .filter(Xcodeproj_1.isNotComment)
        .forEach(([, item]) => {
        item.attributes.TargetAttributes[nativeTargetId].DevelopmentTeam = appleTeamId;
        item.attributes.TargetAttributes[nativeTargetId].ProvisioningStyle = 'Manual';
    });
    fs_extra_1.default.writeFileSync(project.filepath, project.writeSync());
}
exports.setProvisioningProfileForPbxproj = setProvisioningProfileForPbxproj;
//# sourceMappingURL=ProvisioningProfile.js.map