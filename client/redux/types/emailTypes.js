export const VALIDAR_EMAIL = "VALIDAR_EMAIL";
export const VERIFY_EMAIL = 'VERIFY_EMAIL';

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