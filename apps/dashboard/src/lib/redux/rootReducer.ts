import { combineReducers } from 'redux';

// import slices
import agetSliceReducer from './features/agent/agentSlice';

const rootReducer = combineReducers({
    agent: agetSliceReducer,
});

export default rootReducer;