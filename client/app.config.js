require('dotenv').config();
const {LOCAL_IP} = process.env
console.log(LOCAL_IP)
export default ({ config }) => {
    return {
      ...config,
      extra: {
        api: process.env.LOCAL_IP,
      },
    };
  };
  
