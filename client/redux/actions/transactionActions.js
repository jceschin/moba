import axios from "axios";
import {
  addTransaction,
  getTransactions,
  clearTransaction,
} from "../types/transactionTypes";
import { apiEndpoint } from "../../const";

export function addNewTransaction(transferData) {
  return async (dispatch) => {
    try {
      const res = axios.post(`http://${apiEndpoint}/transaction`, {
        ...transferData,
      });
      res.then((tr) => {
        console.log("PAYLOADD", tr);
        dispatch(addTransaction(tr.data));
      });
    } catch (error) {
      console.log(error);
    }
  };
}

//Get transactions
export function getUserTransactions(username, token) {
  return (dispatch) => {
    return axios
      .get(`http://${apiEndpoint}/transaction/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((tr) => {
        dispatch(getTransactions(tr.data));
      })
      .catch((err) => console.log(err));
  };
}

//Check interapp's transactions
export function checkInterappTransactions(cvu, username, token) {
  return (dispatch) => {
    return axios
      .get(`http://${apiEndpoint}/interoperabilities/${cvu}`)
      .then((data) => {
        console.log(data);
        return dispatch(getUserTransactions(username, token));
      });
  };
}

//Send money to other app
export function sendInterappTransaction(cvu, body) {
  console.log(cvu, body);
  return (dispatch) => {
    return axios
      .post(`http://${apiEndpoint}/interoperabilities/send/${cvu}`, body)
      .then((transfer) => {
        transfer.data && dispatch(addTransaction(transfer.data));
      })
      .catch((err) => console.log(err));
  };
}

export function clearLastTransaction() {
  return async (dispatch) => {
    dispatch(clearTransaction());
  };
}
