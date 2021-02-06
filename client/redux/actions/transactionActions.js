import axios from 'axios';
import { addTransaction, getTransactions } from '../types/transactionTypes';

export function addNewTransaction(transferData) {
    return async (dispatch) => {
        try {
            const res = axios.post(`http://localhost:8080/transaction`, { ...transferData });
            
            dispatch(addTransaction(res.config.data));
        } catch (error) {
            console.log(error);
        }
    }
}

//Get transactions 
export function getUserTransactions(username, token){
    return (dispatch) => {
      return axios.get(
            `http://localhost:8080/transaction/users/${username}`, {
            headers: { Authorization: `Bearer ${token}` },
          }
          ).then((tr) => {
            dispatch(getTransactions(tr.data))
          })
          .catch((err) => console.log(err))
    }
  }