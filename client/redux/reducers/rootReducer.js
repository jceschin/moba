import { combineReducers } from 'redux';
import userReducer from './userReducer';
import { emailReducer } from "./emailReducer"
import {contactsReducer} from "./contactsReducer"

const rootReducer = combineReducers({
    user: userReducer,
    email: emailReducer,
    contacts: contactsReducer
})

export default rootReducer;