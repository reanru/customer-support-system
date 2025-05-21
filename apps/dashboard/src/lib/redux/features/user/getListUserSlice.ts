import axios from 'axios';
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

export const getListUser = createAsyncThunk(
    'user/getListUser',
    async(_, { getState, rejectWithValue }) => {
        try {
            const CONFIG = {
                headers: {
                    'Content-Type': 'application/json',
                }
            }

            const res = await axios.get('http://localhost:3001/api/users?page=1&size=10', CONFIG);
            return res.data;
        } catch (error: any) {
            const message =
            error.response?.data ?? error.message;
            return rejectWithValue(message);
        }
    }
)

const getListUserSlice = createSlice({
    name: 'listUser',
    initialState,
    reducers: {
        resetGetListUser: (state) => {
            state.loading = false;
            state.data = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(getListUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getListUser.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload.data;
            state.success = true;
        })
        .addCase(getListUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
    }
});

export const { resetGetListUser } = getListUserSlice.actions;
export default getListUserSlice.reducer;