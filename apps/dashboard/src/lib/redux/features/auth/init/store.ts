import loginUserReducer from '../slice/loginUserSlice';
import tokenReducer from "../slice/tokenHandlerSlice";

export const combineAuthReducers = {
    token: tokenReducer,
    login_user: loginUserReducer
};