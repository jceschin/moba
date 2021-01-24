import { ExpoConfig } from '@expo/config-types';
import { InfoPlist } from './IosConfig.types';
export declare function getCustomInfoPlistEntries(config: Pick<ExpoConfig, 'ios'>): {
    [k: string]: any;
};
export declare function setCustomInfoPlistEntries(config: Pick<ExpoConfig, 'ios'>, infoPlist: InfoPlist): InfoPlist;
