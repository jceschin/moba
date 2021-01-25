import { ResourceKind } from './Resources';
export interface ProjectFile<L extends string = string> {
    path: string;
    language: L;
    contents: string;
}
export declare type GradleProjectFile = ProjectFile<'groovy' | 'kt'>;
export declare type ApplicationProjectFile = ProjectFile<'java' | 'kt'>;
export declare function getMainApplicationAsync(projectRoot: string): Promise<ApplicationProjectFile>;
export declare function getMainActivityAsync(projectRoot: string): Promise<ApplicationProjectFile>;
export declare function getProjectBuildGradleAsync(projectRoot: string): Promise<GradleProjectFile>;
export declare function getSettingsGradleAsync(projectRoot: string): Promise<GradleProjectFile>;
export declare function getAppBuildGradleAsync(projectRoot: string): Promise<GradleProjectFile>;
export declare function getAppBuildGradle(projectRoot: string): string;
export declare function getProjectPathOrThrowAsync(projectRoot: string): Promise<string>;
export declare function getAndroidManifestAsync(projectRoot: string): Promise<string>;
export declare function getResourceFolderAsync(projectRoot: string): Promise<string>;
export declare function getResourceXMLPathAsync(projectRoot: string, { kind, name }: {
    kind?: ResourceKind;
    name: 'colors' | 'strings' | 'styles' | string;
}): Promise<string>;
