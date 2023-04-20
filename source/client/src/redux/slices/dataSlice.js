import { LINKS, REJECTED_ERROR, STATUS, THUNK_STATUS } from "../../config.js";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

export const getAllDataThunk = createAsyncThunk("/data", async () => {
  try {
    const res = await axios.get(LINKS.GET_DATA);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
});

export const getAllSortedDataThunk = createAsyncThunk(
  "/data/sort",
  async (data) => {
    try {
      const res = await axios.post(LINKS.GET_SORTED_DATA, data);
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const getAllDistinctDataThunk = createAsyncThunk(
  "/data/distinct",
  async (data) => {
    try {
      const res = await axios.post(LINKS.GET_DISTINCT_DATA, data);
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

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
    distinct: {},
  },
  status: {
    getAllDataThunk: THUNK_STATUS.IDLE,
    getAllSortedDataThunk: THUNK_STATUS.IDLE,
    getAllDistinctDataThunk: THUNK_STATUS.IDLE,
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
      })
      // sosrted data
      .addCase(getAllSortedDataThunk.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllSortedDataThunk.fulfilled, (state, { payload }) => {
        state.status.getAllSortedDataThunk = THUNK_STATUS.FULFILLED;
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
      .addCase(getAllSortedDataThunk.rejected, (state, action) => {
        state.loading = false;
        state.status.getAllSortedDataThunk = THUNK_STATUS.ERROR;
        state.errorData = REJECTED_ERROR;
      })
      // distinct data
      .addCase(getAllDistinctDataThunk.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllDistinctDataThunk.fulfilled, (state, { payload }) => {
        state.status.getAllDistinctDataThunk = THUNK_STATUS.FULFILLED;
        switch (payload.type) {
          case STATUS.SUCCESS:
            state.loading = false;
            state.data.distinct = payload.data;
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
      .addCase(getAllDistinctDataThunk.rejected, (state, action) => {
        state.loading = false;
        state.status.getAllDistinctDataThunk = THUNK_STATUS.ERROR;
        state.errorData = REJECTED_ERROR;
      });
  },
});

export default dataSlice.reducer;
export const {} = dataSlice.actions;
