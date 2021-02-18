export const VALIDAR_EMAIL = "VALIDAR_EMAIL";
export const VERIFY_EMAIL = 'VERIFY_EMAIL';
export const USERNAME_RECOVERY = 'USERNAME_RECOVERY';
export const PASSWORD_RECOVERY = 'PASSWORD_RECOVERY';
export const VERIFY_TOKEN = 'VERIFY_TOKEN';
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD';
export const CLEAR_PASS = 'CLEAR_PASS';
export const CLEAR_TOKEN = 'CLEAR_TOKEN';
export const CLEAN_EMAILORUSERNAME = 'CLEAN_EMAILORUSERNAME';
export const CLEAN_USERNAME = 'CLEAN_USERNAME';
export const CLEAR_VERIFY = 'CLEAR_VERIFY';
export const EMAIL_TRANSFER_INVITATION = "EMAIL_TRANSFER_INVITATION"



export const validarEmail = (res) => {
  return {
    type: VALIDAR_EMAIL,
    payload: res,
  };
};

export const typeVerifyEmail = (res) => {
  return {
    type: VERIFY_EMAIL,
    payload: res,
  };
};

export const typeUsernameRecovery = (res) => {
  return {
    type: USERNAME_RECOVERY,
    payload: res,
  };
};

export const typePasswordRecovery = (res) => {
  return {
    type: PASSWORD_RECOVERY,
    payload: res,
  };
};

export const typeVerifyToken = (res) => {
  return {
    type: VERIFY_TOKEN,
    payload: res,
  };
};

export const typeUpdatePassword = (res) => {
  return {
    type: UPDATE_PASSWORD,
    payload: res,
  };
}

export const typeClearPass = () => {
  return {
    type: CLEAR_PASS,
    payload: []
  };
}

export const typeClearToken = () => {
  return {
    type: CLEAR_TOKEN,
    payload: []
  };
}

export const typecleanEmailOrUsername = () => {
  return {
    type: CLEAN_EMAILORUSERNAME,
    payload: []
  };
}

export const typecleanUsername = () => {
  return {
    type: CLEAN_USERNAME,
    payload: []
  };
}

export const typeClearVerify = () => {
  return {
    type: CLEAR_VERIFY,
  };
}

export const emailTransferInvitation = () => {
  return {
    type: EMAIL_TRANSFER_INVITATION,
    payload: []
  };
}

