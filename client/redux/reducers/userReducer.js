import {
  CREATE_USER,
  LOGIN_USER,
  LOGOUT_USER,
  AUTO_LOGIN,
  RECOVERY_USER,
  PASSWORD_RESET,
  CHANGE_USER_PASSWORD,
  ADD_USER_CONTACT,
  REMOVE_USER_CONTACT,
  GET_USER_CONTACTS,
  GET_USER_INFO
} from '../types/userTypes';

const initialState = {
  user: {},
  users: [],
  userAUTH: [],
  isLoading: true,
  userToken: "",
  isAuthenticated: false,
  info : []
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
        user: [...state.user, action.contact]
      };
    case REMOVE_USER_CONTACT:
      return {
        ...state,
        user: state.user.filter(c => c.alias !== action.deletedContact)
      };
    case GET_USER_CONTACTS:
      return {
        ...state,
        user: action.contacts
      };
      case GET_USER_INFO:
        return {
          ...state, 
          info : action.info,
        }
    default:
      return state;
  }
}

export default userReducer;
