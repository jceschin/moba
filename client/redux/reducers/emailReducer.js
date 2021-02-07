import { VALIDAR_EMAIL, VERIFY_EMAIL, USERNAME_RECOVERY, PASSWORD_RECOVERY } from "../types/emailTypes";

const initialState = {
    newEmail: {},
    verify: [],
    username: [],
    emailOrUsername: [],
    token: []
};

export function emailReducer(state = initialState, action) {
    switch (action.type) {

        case VALIDAR_EMAIL:
            return {
                ...state,
                newEmail: action.payload,
            };  
            case VERIFY_EMAIL:
            return {
                ...state,
                verify: action.payload,
            }; 
            case USERNAME_RECOVERY:
                return {
                    ...state,
                    username: action.payload
                };
            case PASSWORD_RECOVERY:
                return {
                    ...state,
                    emailOrUsername: action.payload
                }      
    
        default:
            return state;
    }
}