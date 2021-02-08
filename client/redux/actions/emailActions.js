import axios from 'axios';
import { validarEmail, typeVerifyEmail, typeUsernameRecovery, typePasswordRecovery } from "../types/emailTypes"
import {apiEndpoint} from '../../const'

//:::::Enviar email con código de validación
export const enviarEmail = (state) => async(dispatch) => {
    try {
        const result = await axios.post(`http://${apiEndpoint}/email/send-email`, state);

        dispatch(validarEmail(result.data));
     
    } catch (error) {
        console.log(error)
    };
};


//::::: Verificar código de validación
export const verifyEmail = (state) => async(dispatch) => {
    try {
        const result = await axios.post(`http://${apiEndpoint}/email/verify`, state);

        dispatch(typeVerifyEmail(result.data));
        console.log(result.data)  // arroja true o false según back
     
    } catch (error) {
        console.log(error)
    };
};


//:::: Recuperar UserName
export const  usernameRecovery = (mailAndPass) => async(dispatch) => {
    try {
        const result = await axios.post(`http://${apiEndpoint}/email/findUserName`, mailAndPass );
        dispatch(typeUsernameRecovery(result.data));
        console.log(result.data)
    } catch (error) {
        console.log(error)
    };
};

//:::: Recuperar Password
export const  passwordRecovery = (dataUser) => async(dispatch) => {
    console.log("Este es el", dataUser)
    try {
        const result = await axios.post(`http://${apiEndpoint}/email/recovery/sendtoken`, dataUser );
        dispatch(typePasswordRecovery(result.data));
        console.log(result.data)
    } catch (error) {
        console.log(error)
    };
};