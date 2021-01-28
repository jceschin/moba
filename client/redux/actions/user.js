import axios from 'axios';

import {
    createUser,
    loginUser,
    logoutUser,
    autoLogin,
    recoveryUser,
    passwordReset,
    changeUserPassword
} from '../types/userTypes';

export const createNewUser = (newUser) => {
    return async (dispatch) => {
        try {
            const res = await axios.post(`http://localhost:8080/auth/singup`, { ...newUser });

            dispatch(createUser(res.data));
        } catch (error) {
            console.log(error);
        }
    };
};

// Loguear un usuario

export function loginStateUser(loginInput) {
    const { username } = loginInput;
    return (dispatch) => {
      return axios
        .post("http://localhost:8080/auth/login", loginInput)
        .then((json) => {
          if (json.statusText === "OK") {
            console.log(json);
            const o = { ...json, username: username };
            dispatch(loginUser(o));
          } else {
            Alert.alert("Login Failed", "Username or Password is incorrect");
          }
        })
        .catch((err) => {
          Alert.alert("Login Failed", "Some error occured, please retry");
          console.log(err);
        });
    };
  }
  
  // Logout del usuario 
  
  export function logoutUserAction() {
    return async function (dispatch) {
      await dispatch(logoutUser());
    };
  }
  
  

