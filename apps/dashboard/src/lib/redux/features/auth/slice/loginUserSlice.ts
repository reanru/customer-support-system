import axios from 'axios';
import { API_ENDPOINT } from "../init/apiUrl";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

type InitState = {
  loading: boolean;
  data: any | null;
  error: string | null;
  success: boolean;
}

const initialState: InitState = {
  loading: false,
  data: null,
  error: null,
  success: false,
};

type Credential = {
    email?: string,
    password?: string,
}

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async(data: Credential, { getState, rejectWithValue }) => {
        try {
            const CONFIG = {
                headers: {
                    'Content-Type': 'application/json',
                }
            }

            const res = await axios.post(API_ENDPOINT.LOGIN_USER, data, CONFIG);
            await axios.post('http://localhost:3000/api/set-cookies', {token: res.data.data.token});

            return res.data;
        } catch (error: any) {
            const message =
            error.response?.data ?? error.message;
            return rejectWithValue(message);
        }
    }
)

const loginUserSlice = createSlice({
    name: 'loginUser',
    initialState,
    reducers: {
        resetLoginUser: (state) => {
            state.loading = false;
            state.data = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload.data;
            state.success = true;
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
    }
});

export const { resetLoginUser } = loginUserSlice.actions;
export default loginUserSlice.reducer;