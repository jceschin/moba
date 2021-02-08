import {
  CREATE_USER,
  LOGIN_USER,
  LOGOUT_USER,
  AUTO_LOGIN,
  RECOVERY_USER,
  PASSWORD_RESET,
  CHANGE_USER_PASSWORD,
  GET_USER_INFO,
  GET_USER_TRANSACTIONS,
  CHARGE_USER_ACCOUNT
} from "../types/userTypes";

const initialState = {
  user: {},
  users: [],
  userAUTH: [],
  isLoading: true,
  userToken: "",
  isAuthenticated: false,
  info: [],
  transactions: []
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER:
      return {
        ...state,
        user: [state.user, action.user],
      };
    case AUTO_LOGIN:
      return {
        ...state,
        userToken: action.token,
        isLoading: false,
        isAuthenticated: true,
      };
    case LOGOUT_USER:
      return {
        user: null,
        userToken: null,
        isLoading: false,
        isAuthenticated: false,
        state: undefined,
      };
    case LOGIN_USER:
      return {
        ...state,
        ...action.payload,
        userToken: action.token,
        isAuthenticated: true,
      };
    
    case GET_USER_INFO:
      return {
        ...state,
        info: action.info,
      };
    case GET_USER_TRANSACTIONS:
      return {
        ...state,
        transactions: action.transactions,
      };
      case CHARGE_USER_ACCOUNT:
      return {
        ...state,
        charge: state.charge.map(charge =>
          charge.id === action.payload.id ? charge = action.payload : charge,
        )};
    default:
      return state;
  }
};

export default userReducer;
