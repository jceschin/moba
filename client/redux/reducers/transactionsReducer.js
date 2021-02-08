import { ADD_TRANSACTION, GET_USER_TRANSACTIONS, CLEAR_LAST_TRANSACTION } from "../types/transactionTypes";

const initialState = {
    transactions: [],
    lastTransaction: null
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
        case CLEAR_LAST_TRANSACTION:
            return{
                ...state,
                lastTransaction: null
            }
        default:
            return state;
    }
}