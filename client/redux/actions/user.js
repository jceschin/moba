import axios from 'axios';

import {
    createUser,
    loginUser,
    logoutUser,
    autoLogin,
    recoveryUser,
    passwordReset,
    changeUserPassword
} from '../Types/userTypes';

export const createNewUser = (newUser) => {
    return async (dispatch) => {
        try {
            const res = await axios.post(`http://localhost:8080/auth/singup`, { ...newUser });

            dispatch(createUser(res.data));
        } catch (error) {
            console.log(error);
        }
    };
};

