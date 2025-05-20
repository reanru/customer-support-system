import { configureStore } from '@reduxjs/toolkit'
import agentReducer from './features/agent/agentSlice'

const store = configureStore({
  reducer: {
    get_list_agent: agentReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;