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
const EasBuildGradleScript_1 = __importDefault(require("./EasBuildGradleScript"));
const Paths = __importStar(require("./Paths"));
const APPLY_EAS_GRADLE = 'apply from: "./eas-build.gradle"';
function hasApplyLine(content, applyLine) {
    return (content
        .split('\n')
        // Check for both single and double quotes
        .some(line => line === applyLine || line === applyLine.replace(/"/g, "'")));
}
function getEasBuildGradlePath(projectRoot) {
    return path_1.default.join(projectRoot, 'android', 'app', 'eas-build.gradle');
}
exports.getEasBuildGradlePath = getEasBuildGradlePath;
async function configureEasBuildAsync(projectRoot) {
    const buildGradlePath = Paths.getAppBuildGradle(projectRoot);
    const easGradlePath = getEasBuildGradlePath(projectRoot);
    await fs_extra_1.default.writeFile(easGradlePath, EasBuildGradleScript_1.default);
    const buildGradleContent = await fs_extra_1.default.readFile(path_1.default.join(buildGradlePath), 'utf8');
    const hasEasGradleApply = hasApplyLine(buildGradleContent, APPLY_EAS_GRADLE);
    if (!hasEasGradleApply) {
        await fs_extra_1.default.writeFile(buildGradlePath, `${buildGradleContent.trim()}\n${APPLY_EAS_GRADLE}\n`);
    }
}
exports.configureEasBuildAsync = configureEasBuildAsync;
async function isEasBuildGradleConfiguredAsync(projectRoot) {
    const buildGradlePath = Paths.getAppBuildGradle(projectRoot);
    const easGradlePath = getEasBuildGradlePath(projectRoot);
    const hasEasGradleFile = await fs_extra_1.default.pathExists(easGradlePath);
    const buildGradleContent = await fs_extra_1.default.readFile(path_1.default.join(buildGradlePath), 'utf8');
    const hasEasGradleApply = hasApplyLine(buildGradleContent, APPLY_EAS_GRADLE);
    return hasEasGradleApply && hasEasGradleFile;
}
exports.isEasBuildGradleConfiguredAsync = isEasBuildGradleConfiguredAsync;
//# sourceMappingURL=EasBuild.js.map