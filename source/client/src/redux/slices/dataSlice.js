import { LINKS, REJECTED_ERROR, STATUS, THUNK_STATUS } from "../../config.js";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

export const getAllDataThunk = createAsyncThunk("/data", async (phone) => {
  try {
    const res = await axios.get(LINKS.GET_DATA);
    console.log(LINKS.GET_DATA);
    console.log(res.data);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
});

const initialState = {
  loading: false,
  errorData: {
    message: "",
    type: "",
    errors: [],
  },
  isError: false,
  data: {
    entries: [],
  },
  status: {
    getAllDataThunk: THUNK_STATUS.IDLE,
  },
};

const dataSlice = createSlice({
  name: "data",
  initialState: initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllDataThunk.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllDataThunk.fulfilled, (state, { payload }) => {
        state.status.getAllDataThunk = THUNK_STATUS.FULFILLED;
        switch (payload.type) {
          case STATUS.SUCCESS:
            state.loading = false;
            state.data.entries = payload.data;
            break;
          default:
            state.loading = false;
            state.isError = true;
            state.errorData = {
              message: payload.message,
              type: payload.type,
              errors: payload.errors,
            };
        }
      })
      .addCase(getAllDataThunk.rejected, (state, action) => {
        state.loading = false;
        state.status.getAllDataThunk = THUNK_STATUS.ERROR;
        state.errorData = REJECTED_ERROR;
      });
  },
});

export default dataSlice.reducer;
export const {} = dataSlice.actions;
