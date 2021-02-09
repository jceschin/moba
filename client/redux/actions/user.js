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
  userInfo,
  getTransactions,
  chargeUserCode,
  newCharge,
  userStats,
  userLinealStats
} from '../types/userTypes';
import {apiEndpoint} from '../../const'
import AsyncStorage from "@react-native-async-storage/async-storage";
// Create user account

export const createNewUser = (newUser) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`http://${apiEndpoint}/auth/singup`, { ...newUser });

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
      .post(`http://${apiEndpoint}/auth/login`, loginInput)
      .then((json) => {
        if (json.status === 200) {
          const o = { ...json, username: username };
          console.log(json)
          alert(apiEndpoint)
          dispatch(loginUser(o));
        } else {
          alert("Login Failed", "Username or Password is incorrect");
        }
      })
      .catch((err) => {
        alert("Login Failed", "Some error occured, please retry later");
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


//Get user full info
export function getUserInfo(username){
  return (dispatch) => {
    return axios
      .get(`http://${apiEndpoint}/users/${username}`)
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



export function chargeAccount(chargeCode, amount) {
  return async (dispatch) => {
    try {
      await axios.put(
        `http://${apiEndpoint}/accounts/recharge/${chargeCode}`,
        amount,
        {
          headers: { Authorization: `Bearer ${AsyncStorage.getItem("token")}` },
        }
      );
      dispatch(newCharge(amount));
    } catch (error) {
      console.log(error);
    }
  };
}

export function getUserStats(cvu, dateFrom, dateTo){
  return (dispatch) => {
    return axios
      .get(`http://${apiEndpoint}/statistics/${cvu}/${dateFrom}/${dateTo}`)
      .then((data) => {
        if(data.status !== 200){
          alert('Sorry, an error ocurred')          
        }
        else{
          var payload = data.data 
          dispatch(userStats(payload))
        }
      })
      .catch((err) => console.log(err))

  }
}

export function getLinealUserStats(cvu, dateFrom, dateTo){
  return (dispatch) => {
    return axios
      .get(`http://${apiEndpoint}/statistics/lineal/${cvu}/${dateFrom}/${dateTo}`)
      .then((data) => {
        if(data.status !== 200){
          alert('Sorry, an error ocurred')          
        }
        else{
          console.log('ASDASD', data)
          var payload = data.data 
          dispatch(userLinealStats(payload))
        }
      })
      .catch((err) => console.log(err))

  }
}
