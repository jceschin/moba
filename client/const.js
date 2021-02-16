import Constants from 'expo-constants';

const {LOCAL_IP, HEROKU_IP} = Constants.manifest.extra

//var dsa = env.heroku ? env.heroku : env.local ? env.local : 'localhost'

export const apiEndpoint = LOCAL_IP ? `${LOCAL_IP}:8080` : 'localhost:8080'
