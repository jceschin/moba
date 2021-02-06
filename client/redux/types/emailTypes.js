export const VALIDAR_EMAIL = "VALIDAR_EMAIL";
export const VERIFY_EMAIL = 'VERIFY_EMAIL';
export const USERNAME_RECOVERY = 'USERNAME_RECOVERY'
export const PASSWORD_RECOVERY = 'PASSWORD_RECOVERY'

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