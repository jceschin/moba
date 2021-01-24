declare type ProvisioningProfileSettings = {
    targetName?: string;
    appleTeamId: string;
    profileName: string;
};
declare function setProvisioningProfileForPbxproj(projectRoot: string, { targetName, profileName, appleTeamId }: ProvisioningProfileSettings): void;
export { setProvisioningProfileForPbxproj };
