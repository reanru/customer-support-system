import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

type ListAgent = {
  loading: boolean;
  data: any | null;
  error: string | null;
  success: boolean;
}

const initialState: ListAgent = {
  loading: false,
  data: null,
  error: null,
  success: false,
};

export const getListAgent = createAsyncThunk(
    'agent/getListAgent',
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

const agentSlice = createSlice({
    name: 'agent',
    initialState,
    reducers: {
        resetGetListAgent: (state) => {
            state.loading = false;
            state.data = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(getListAgent.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getListAgent.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.success = true;
        })
        .addCase(getListAgent.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    }
});

export const { resetGetListAgent } = agentSlice.actions;
export default agentSlice.reducer;