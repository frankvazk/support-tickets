import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import noteService from "./noteService";

const initialState = {
  notes: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const createNote = createAsyncThunk(
  "notes/create",
  async ({ ticketId, text }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await noteService.createNote(ticketId, text, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.rejectWithValue(message);
    }
  }
);

export const getNotes = createAsyncThunk(
  "notes/get",
  async (ticketId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await noteService.getNotes(ticketId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.rejectWithValue(message);
    }
  }
);

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
      state.isSaving = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNote.pending, (state, action) => {
        state.isSaving = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isSaving = false;
        state.isError = false;
        state.notes = [action.payload, ...state.notes];
      })
      .addCase(createNote.rejected, (state) => {
        state.isError = true;
        state.isSuccess = false;
        state.isSaving = false;
      })
      .addCase(getNotes.pending, (state, action) => {
        state.isSuccess = false;
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.isError = false;
        state.notes = action.payload;
      })
      .addCase(getNotes.rejected, (state) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
      });
  },
});

export const { reset } = noteSlice.actions;
export default noteSlice.reducer;
