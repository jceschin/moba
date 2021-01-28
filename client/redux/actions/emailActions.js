import axios from 'axios';
import { validarEmail } from "../types/emailTypes"


export const enviarEmail = (state) => async() => {
    try {
       axios.post('http://localhost:8005/send-email', state);
     
    } catch (error) {
        console.log(error)
    };
};

export const validoEmail = (object) => async(dispatch) => {

    const { email } = object;

    try {
        const result = await axios.get(`http://localhost:8005/email?email=${email}`);

       dispatch(validarEmail(result.data));
    } catch (error) {
        console.log(error);
    }
}