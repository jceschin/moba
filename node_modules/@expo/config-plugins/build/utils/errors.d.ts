export declare class UnexpectedError extends Error {
    readonly name = "UnexpectedError";
    constructor(message: string);
}
export declare type PluginErrorCode = 'INVALID_PLUGIN_TYPE';
/**
 * Based on `JsonFileError` from `@expo/json-file`
 */
export declare class PluginError extends Error {
    code: PluginErrorCode;
    cause?: Error | undefined;
    readonly name = "PluginError";
    readonly isPluginError = true;
    constructor(message: string, code: PluginErrorCode, cause?: Error | undefined);
}
export declare function assert(value: any, message?: string | Error): asserts value;
