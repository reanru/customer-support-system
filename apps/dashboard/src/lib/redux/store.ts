import { configureStore } from '@reduxjs/toolkit';

import { combineAuthReducers } from './features/auth/init/store'
import { combineUserReducers } from './features/user/init/store'
import { combineConversationReducers } from './features/conversation/init/store';

const store = configureStore({
  reducer: {
    ...combineAuthReducers,
    ...combineUserReducers,
    ...combineConversationReducers
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;