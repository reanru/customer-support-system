import { configureStore } from '@reduxjs/toolkit';

import { combineAuthReducers } from '@/lib/redux/features/auth/init/store'
import { combineUserReducers } from '@/lib/redux/features/user/init/store'
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