import axios from 'axios';
import { API_ENDPOINT } from "../init/apiUrl";
import { RootState } from '@/lib/redux/store';
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

export const deleteUser = createAsyncThunk<
  Record<string, unknown>, // tipe return value
  string, // tipe argumen
  { state: RootState } // ini penting
>(
    'user/deleteUser',
    async(id, { getState, rejectWithValue }) => {
        try {
            const { token  } = getState();

            const CONFIG = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token.token}`
                }
            }
            
            // console.log('testing delete ', id);
            const res = await axios.delete(API_ENDPOINT.DELETE_USER(id), CONFIG);
            return res.data;
        } catch (error: any) {
            const message =
            error.response?.data ?? error.message;
            return rejectWithValue(message);
        }
    }
)

const deleteUserSlice = createSlice({
    name: 'deleteUser',
    initialState,
    reducers: {
        resetDeleteUser: (state) => {
            state.loading = false;
            state.data = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(deleteUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteUser.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload.data;
            state.success = true;
        })
        .addCase(deleteUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
    }
});

export const { resetDeleteUser } = deleteUserSlice.actions;
export default deleteUserSlice.reducer;