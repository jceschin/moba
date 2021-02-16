require('dotenv').config();
const {LOCAL_IP} = process.env
export default ({ config }) => {
    return {
      ...config,
      extra: {
        LOCAL_IP: process.env.LOCAL_IP,
        HEROKU_IP: process.env.XXX
      },
    };
  };
  
