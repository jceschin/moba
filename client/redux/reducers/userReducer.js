import {
  CREATE_USER,
  LOGIN_USER,
  LOGOUT_USER,
  AUTO_LOGIN,
  RECOVERY_USER,
  PASSWORD_RESET,
  CHANGE_USER_PASSWORD
} from '../types/userTypes';

const initialState = {
  user: {},
  users: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER:
      return {
        ...state,
        user: [...state.user, action.user]
      };
    default:
      return state;
  }
}

export default userReducer;