import { VALIDAR_EMAIL, VERIFY_EMAIL, USERNAME_RECOVERY, PASSWORD_RECOVERY, VERIFY_TOKEN, UPDATE_PASSWORD, CLEAR_PASS, CLEAR_TOKEN, CLEAN_EMAILORUSERNAME } from "../types/emailTypes";

const initialState = {
    newEmail: {},
    verify: [],
    username: [],
    emailOrUsername: [],
    token: [],
    pass: []
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
                };
                case VERIFY_TOKEN:
                    return {
                        ...state,
                        token: action.payload,
                    }; 
                 case UPDATE_PASSWORD:
                        return {
                            ...state,
                            pass: action.payload,
                        }; 
                 case CLEAR_PASS:
                            return {
                                ...state,
                                pass: action.payload,
                            }; 
                 case CLEAR_TOKEN:
                            return {
                                  ...state,
                                  token: action.payload,
                                };                         
                 case CLEAN_EMAILORUSERNAME:
                           return {
                                ...state,
                          emailOrUsername: action.payload,
                                        };                       
        default:
            return state;
    }
}