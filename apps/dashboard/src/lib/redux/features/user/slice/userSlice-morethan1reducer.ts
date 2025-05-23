import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// import { AsyncState } from '@/lib/types/asyncState'

const createAsyncState = <T>(initialData: T | null = null, withSuccess = false): AsyncState<T> => ({
    loading: false,
    data: initialData,
    error: null,
    ...(withSuccess && { success: false }),
});

type AsyncState<T = any> = {
    loading: boolean;
    data: T | null;
    error: any;
    success?: boolean;
};

type UserList = { name: string; email: string, role: string }[];

type UserState = {
  list: AsyncState<UserList>;
  add: AsyncState<any>;
//   update: AsyncState<any>;
}

const initialState: UserState = {
  list: createAsyncState<UserList>([]),
  add: createAsyncState(null, true),
//   update: createAsyncState(null, true),
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

export const addNewUser = createAsyncThunk(
    'user/addListUser',
    async(data, { getState, rejectWithValue }) => {
        try {
            const CONFIG = {
                headers: {
                    'Content-Type': 'application/json',
                }
            }

            const res = await axios.post('http://localhost:3001/api/users', data, CONFIG);
            return res.data;
        } catch (error: any) {
            const message =
            error.response?.data ?? error.message;
            return rejectWithValue(message);
        }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetGetListUser: (state) => {
            state.list.loading = false;
            state.list.data = null;
            state.list.error = null;
        },

        resetAddNewUser: (state) => {
            state.add.loading = false;
            state.add.data = null;
            state.add.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
        // handle get list user
        .addCase(getListUser.pending, (state) => {
            state.list.loading = true;
            state.list.error = null;
        })
        .addCase(getListUser.fulfilled, (state, action) => {
            state.list.loading = false;
            state.list.data = action.payload.data;
            state.list.success = true;
        })
        .addCase(getListUser.rejected, (state, action) => {
            state.list.loading = false;
            state.list.error = action.payload as string;
        })

        //handle add new user
        .addCase(addNewUser.pending, (state) => {
            state.add.loading = true;
            state.add.error = null;
        })
        .addCase(addNewUser.fulfilled, (state, action) => {
            state.add.loading = false;
            state.add.data = action.payload.data;
            state.add.success = true;
        })
        .addCase(addNewUser.rejected, (state, action) => {
            state.add.loading = false;
            state.add.error = action.payload as string;
        })
    }
});

export const { resetGetListUser, resetAddNewUser } = userSlice.actions;
export default userSlice.reducer;