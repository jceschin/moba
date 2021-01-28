import { VALIDAR_EMAIL } from "../types/emailTypes";

const initialState = {
    newEmail: [],
};

export function emailReducer(state = initialState, action) {
    switch (action.type) {

        case VALIDAR_EMAIL:
            return {
                ...state,
                newEmail: action.payload,
            };     
    
        default:
            return state;
    }
}