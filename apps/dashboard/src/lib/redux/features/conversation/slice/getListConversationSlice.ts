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

export const getListConversation = createAsyncThunk<
  Record<string, unknown>, // tipe return value
  void, // tipe argumen
  { state: RootState } // ini penting
>(
    'conversation/getListConversation',
    async(_, { getState, rejectWithValue }) => {
        try {
            const { token  } = getState();

            const CONFIG = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token.token}`
                }
            }

            // console.log('testing get conversation ', getState());
            const res = await axios.get(API_ENDPOINT.GET_LIST_CONVERSATION(1, 10), CONFIG);
            return res.data;
        } catch (error: any) {
            const message =
            error.response?.data ?? error.message;
            return rejectWithValue(message);
        }
    }
)

const getListConversationSlice = createSlice({
    name: 'listConversation',
    initialState,
    reducers: {
        resetGetListConversation: (state) => {
            state.loading = false;
            state.data = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(getListConversation.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getListConversation.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload.data;
            state.success = true;
        })
        .addCase(getListConversation.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
    }
});

export const { resetGetListConversation } = getListConversationSlice.actions;
export default getListConversationSlice.reducer;