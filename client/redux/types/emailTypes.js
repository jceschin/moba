export const VALIDAR_EMAIL = "VALIDAR_EMAIL";

export const validarEmail = (res) => {
  return {
    type: VALIDAR_EMAIL,
    payload: res,
  };
};
