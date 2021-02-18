import axios from "axios";
import { apiEndpoint } from "../../const";
import {
  validarEmail,
  typeVerifyEmail,
  typeUsernameRecovery,
  typePasswordRecovery,
  typeVerifyToken,
  typeUpdatePassword,
  typeClearPass,
  typeClearToken,
  typecleanEmailOrUsername,
  typecleanUsername,
  typeClearVerify,
  emailTransferInvitation,
} from "../types/emailTypes";

//:::::Enviar email con código de validación
export const enviarEmail = (state) => async (dispatch) => {
  try {
    const result = await axios.post(
      `http://${apiEndpoint}/email/send-email`,
      state
    );

    dispatch(validarEmail(result.data));
  } catch (error) {
    console.log(error);
  }
};

//::::: Verificar código de validación
export const verifyEmail = (state) => async (dispatch) => {
  try {
    const result = await axios.post(
      `http://${apiEndpoint}/email/verify`,
      state
    );

    dispatch(typeVerifyEmail(result.data));
    console.log(result.data); // arroja true o false según back
  } catch (error) {
    console.log(error);
  }
};

//:::: Recuperar UserName
export const usernameRecovery = (mailAndPass) => async (dispatch) => {
  try {
    const result = await axios.post(
      `http://${apiEndpoint}/email/findUserName`,
      mailAndPass
    );
    dispatch(typeUsernameRecovery(result.data));
    console.log(result.data);
  } catch (error) {
    console.log(error);
  }
};

//:::: Recuperar Password
export const passwordRecovery = (dataUser) => async (dispatch) => {
  console.log("Este es el", dataUser);
  try {
    const result = await axios.post(
      `http://${apiEndpoint}/email/recovery/sendtoken`,
      dataUser
    );
    dispatch(typePasswordRecovery(result.data));
    console.log(result.data);
  } catch (error) {
    console.log(error);
  }
};

//:::: Verifica token
export const verifyToken = (obj) => async (dispatch) => {
  console.log("Este es el", obj);
  try {
    const result = await axios.post(
      `http://${apiEndpoint}/email/recovery/verifytoken`,
      obj
    );
    dispatch(typeVerifyToken(result.data));
    console.log("Este es el de verify", result.data);
  } catch (error) {
    console.log(error);
  }
};

//:::: Actualizar contraseña
export const updatePassword = (mailAndPass) => async (dispatch) => {
  console.log("Este es el", mailAndPass);
  try {
    const result = await axios.put(
      `http://${apiEndpoint}/email/recovery/changepassword`,
      mailAndPass
    );
    dispatch(typeUpdatePassword(result.data));
    console.log(result.data);
  } catch (error) {
    console.log(error);
  }
};

//:::: Email para usuario no registrado que tiene que cobrar transferencia
export const sendEmailToRegister = (url) => {
  return (dispatch) => {
    return axios
      .post(`http://${apiEndpoint}/email/send-email-transfer-register`, url)
      .then((json) => {
        if (json.status === 200 || json.status === 201) {
          console.log("json pana", json.status);
          dispatch(emailTransferInvitation());
        } 
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const clearPass = () => {
  return (dispatch) => {
    dispatch(typeClearPass());
  };
};

export const clearToken = () => {
  return (dispatch) => {
    dispatch(typeClearToken());
  };
};

export const cleanEmailOrUsername = () => {
  return (dispatch) => {
    dispatch(typecleanEmailOrUsername());
  };
};

export const cleanUsername = () => {
  return (dispatch) => {
    dispatch(typecleanUsername());
  };
};

export const cleanVerify = () => {
  return (dispatch) => {
    dispatch(typeClearVerify());
  };
};
