import { combineReducers } from 'redux';
import userReducer from './userReducer';
import { emailReducer } from "./emailReducer"
import {contactsReducer} from "./contactsReducer"
import {transactionsReducer} from "./transactionsReducer"

const rootReducer = combineReducers({
    user: userReducer,
    email: emailReducer,
    contacts: contactsReducer,
    transactions: transactionsReducer
})

export default rootReducer;