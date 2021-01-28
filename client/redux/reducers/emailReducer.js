import { VALIDAR_EMAIL } from "../types/emailTypes";

const initialState = {
    email: [],
};

export function emailReducer(state = initialState, action) {
    switch (action.type) {

        case VALIDAR_EMAIL:
            return {
                email: action.payload,
            };     
    
        default:
            return state;
    }
}