import {
  CREATE_USER,
  LOGIN_USER,
  LOGOUT_USER,
  AUTO_LOGIN,
  RECOVERY_USER,
  PASSWORD_RESET,
  CHANGE_USER_PASSWORD,
  ADD_USER_CONTACT,
  GET_USER_CONTACTS
} from '../types/userTypes';

const initialState = {
  user: {},
  users: [],
  userAUTH: [],
  isLoading: true,
  userToken: "",
  isAuthenticated: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER:
      return {
        ...state,
        user: [state.user, action.user]
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
        state: undefined
      };
      case LOGIN_USER:
      return {
        ...state,
        ...action.payload,
        userToken: action.token,
        isAuthenticated: true, 
      };
      case ADD_USER_CONTACT:
        return {
          ...state,
          user: [state.user, action.contact]
        };
      case GET_USER_CONTACTS:
        return {
          ...state,
          user: action.contacts
        };
    default:
      return state;
  }
}

export default userReducer;
