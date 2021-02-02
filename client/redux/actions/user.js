import axios from 'axios';
import { Alert } from 'react-native'
import {
  createUser,
  loginUser,
  logoutUser,
  autoLogin,
  recoveryUser,
  passwordReset,
  changeUserPassword,
  addUserContact,
  getContacts,
  getSpecificUser
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
        if (json.status === 200) {
          const o = { ...json, username: username };
          console.log(json)
          dispatch(loginUser(o));
        } else {
          alert("Login Failed", "Username or Password is incorrect");
        }
      })
      .catch((err) => {
        Alert.alert("Login Failed", "Some error occured, please retry later");
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

//User adds new contact

export function addNewContact(newContact) {
  return async (dispatch) => {
    try {
      const res = await axios.post(`http://localhost:8080/contacts/add`, { ...newContact });
      console.log(`This is ${newContact}`);
      console.log(res.data);

      dispatch(addUserContact(res.data));
    } catch (error) {
      console.log(error);
    }
  };
}

// Get user contacts

export function getUserContacts(username) {
  return async (dispatch) => {
    try {
      const res = await axios.get(`http://localhost:8080/contacts/get/${username}`);

      dispatch(getContacts(res.data));
    } catch (error) {
      console.log(error);
    }
  }
}

// Get selected user to receive money

export function getSelectedUser(username) {
  return async (dispatch) => {
    try {
      let res = await axios.get (`http://localhost:8000/users/${username}`);

      dispatch(getSpecificUser(res.data));
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }
}



