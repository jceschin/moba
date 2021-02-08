import Constants from 'expo-constants';

const {LOCAL_IP} = Constants.manifest.extra

export const apiEndpoint = LOCAL_IP ? `${LOCAL_IP}:8080` : 'localhost:8080'
