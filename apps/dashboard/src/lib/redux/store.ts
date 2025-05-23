import { configureStore } from '@reduxjs/toolkit';

import { combineUserReducers } from '@/lib/redux/features/user/init/store'

import loginUserReducer from './features/auth/slice/loginUserSlice';

import tokenReducer from "./features/auth/slice/tokenHandlerSlice";

const store = configureStore({
  reducer: {
    ...combineUserReducers,
    token: tokenReducer,
    login_user: loginUserReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;