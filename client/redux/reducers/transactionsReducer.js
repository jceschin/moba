import { ADD_TRANSACTION, GET_USER_TRANSACTIONS } from "../types/transactionTypes";

const initialState = {
    transactions: [],
    lastTransaction: {}
};

export function transactionsReducer(state = initialState, action) {
    switch (action.type) {  
        case ADD_TRANSACTION:
            return {
                ...state,
                lastTransaction: action.transferData
            }; 
        case GET_USER_TRANSACTIONS:
            return {
                ...state,
                transactions: action.transactions,
            };      
        default:
            return state;
    }
}