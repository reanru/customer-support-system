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

type NewUser = {
    name?: string,
    email?: string,
    role?: string
}

export const addNewUser = createAsyncThunk<
  Record<string, unknown>, // tipe return value
  NewUser, // tipe argumen
  { state: RootState } // ini penting
>(
    'user/addNewUser',
    async(data, { getState, rejectWithValue }) => {
        try {
            const { token  } = getState();

            const CONFIG = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token.token}`
                }
            }

            const res = await axios.post(API_ENDPOINT.ADD_NEW_USER, data, CONFIG);
            return res.data;
        } catch (error: any) {
            const message =
            error.response?.data ?? error.message;
            return rejectWithValue(message);
        }
    }
)

const addNewUserSlice = createSlice({
    name: 'addUser',
    initialState,
    reducers: {
        resetAddNewUser: (state) => {
            state.loading = false;
            state.data = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(addNewUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(addNewUser.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload.data;
            state.success = true;
        })
        .addCase(addNewUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
    }
});

export const { resetAddNewUser } = addNewUserSlice.actions;
export default addNewUserSlice.reducer;