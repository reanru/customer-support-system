import { configureStore } from '@reduxjs/toolkit';
import getListUserReducer from './features/user/getListUserSlice';
import addNewUserReducer from './features/user/addNewUserSlice';
import deleteUserReducer from './features/user/deleteUserSlice';
import loginUserReducer from './features/login/loginUserSlice';

const store = configureStore({
  reducer: {
    get_list_user: getListUserReducer,
    add_new_user: addNewUserReducer,
    delete_user: deleteUserReducer,
    login_user: loginUserReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;