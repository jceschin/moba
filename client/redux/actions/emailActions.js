import axios from 'axios';
import { validarEmail } from "../types/emailTypes"


export const enviarEmail = (state) => async(dispatch) => {
    try {
        const result = await axios.post('http://localhost:8005/send-email', state);

        dispatch(validarEmail(result.data));
     
    } catch (error) {
        console.log(error)
    };
};
