import { combineReducers } from 'redux';
import userReducer from './userReducer';
import { emailReducer } from "./emailReducer"

const rootReducer = combineReducers({
    user: userReducer,
    email: emailReducer,
})

export default rootReducer;