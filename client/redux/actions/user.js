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
  removeContact,
  getContacts,
  userInfo
} from '../types/userTypes';

// Create user account

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
      const res = await axios.post(`http://localhost:8080/contacts/add`, { ...newContact }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      console.log('ESTO ES NEW CONTACT', newContact);

      dispatch(addUserContact(res.data));
      console.log('ESTO ES DATA', res.data);
    } catch (error) {
      console.log(error);
    }
  };
}

// Delete user contact

export const deleteContact = (alias) => {
  return async (dispatch) => {
    try {

      const res = await axios.delete(`http://localhost:8080/contacts/${alias}`);
      console.log('ESTE ES EL ALIAS', alias);

      dispatch(removeContact(res.data));

    } catch (error) {
      console.log('ERROR EN DELETE CONTACT', error)
    }
  }
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

//Get user full info
export function getUserInfo(username){
  return (dispatch) => {
    return axios
      .get(`http://localhost:8000/users/${username}`)
      .then((data) => {
        if(data.status !== 200){
          alert('Sorry, an error ocurred')          
        }
        else{
          var payload = data.data 
          dispatch(userInfo(payload))
        }
      })
      .catch((err) => console.log(err))

  }
}



