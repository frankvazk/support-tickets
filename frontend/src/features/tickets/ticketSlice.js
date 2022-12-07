import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ticketService from "./ticketService";

const initialState = {
  tickets: [],
  ticket: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  isSaving: false,
  message: "",
};

export const createTicket = createAsyncThunk(
  "ticket/create",
  async (ticket, thunkAPI) => {
    try {
      //Get Token from Auth State
      const token = thunkAPI.getState().auth.user.token;
      // Enviamos el error al extra reducer fulfilled
      return await ticketService.create(ticket, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      // Enviamos el error al extra reducer fulfilled
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateTicket = createAsyncThunk(
  "ticket/update",
  async (ticket, thunkAPI) => {
    try {
      //Get Token from Auth State
      const token = thunkAPI.getState().auth.user.token;
      // Enviamos el error al extra reducer fulfilled
      return await ticketService.updateTicket(ticket._id, ticket, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      // Enviamos el error al extra reducer fulfilled
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getTickets = createAsyncThunk(
  "ticket/tickets",
  async (_, thunkAPI) => {
    try {
      //Get Token from Auth State
      const token = thunkAPI.getState().auth.user.token;
      // Enviamos el error al extra reducer fulfilled
      return await ticketService.getTickets(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      // Enviamos el error al extra reducer fulfilled
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getTicket = createAsyncThunk(
  "ticket/ticket",
  async (id, thunkAPI) => {
    try {
      //Get Token from Auth State
      const token = thunkAPI.getState().auth.user.token;
      // Enviamos el error al extra reducer fulfilled
      return await ticketService.getTicket(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      // Enviamos el error al extra reducer fulfilled
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const ticketSlice = createSlice({
  name: "ticket",
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
      .addCase(createTicket.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "";
        state.ticket = {};
      })
      .addCase(getTickets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTickets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.message = "";
        state.tickets = action.payload;
      })
      .addCase(getTickets.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTicket.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.message = "";
        state.ticket = action.payload;
      })
      .addCase(getTicket.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateTicket.pending, (state) => {
        state.isSaving = true;
        state.isSuccess = false;
      })
      .addCase(updateTicket.fulfilled, (state, action) => {
        state.isSaving = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "";
        state.tickets.map((ticket) =>
          ticket._id === action.payload.id ? (ticket.status = "closed") : ticket
        );
      })
      .addCase(updateTicket.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isSaving = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = ticketSlice.actions;
export default ticketSlice.reducer;
