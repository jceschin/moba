import { ExportedConfig, ModPlatform } from '../Plugin.types';
/**
 *
 * @param projectRoot
 * @param config
 */
export declare function compileModsAsync(config: ExportedConfig, props: {
    projectRoot: string;
    platforms?: ModPlatform[];
}): Promise<ExportedConfig>;
/**
 * A generic plugin compiler.
 *
 * @param config
 */
export declare function evalModsAsync(config: ExportedConfig, { projectRoot, platforms }: {
    projectRoot: string;
    platforms?: ModPlatform[];
}): Promise<ExportedConfig>;
