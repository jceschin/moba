import { VALIDAR_EMAIL, VERIFY_EMAIL } from "../types/emailTypes";

const initialState = {
    newEmail: {},
    verify: []
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
    
        default:
            return state;
    }
}