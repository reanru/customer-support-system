    import { createSlice } from '@reduxjs/toolkit';

    const initialState = {
      token: null,
    };

    const tokenSlice = createSlice({
      name: 'token',
      initialState,
      reducers: {
        updateToken: (state, action) => {
          state.token = action.payload;
        },
        clearToken: (state) => {
          state.token = null;
        }
      },
    });

    export const { updateToken, clearToken } = tokenSlice.actions;
    export default tokenSlice.reducer;