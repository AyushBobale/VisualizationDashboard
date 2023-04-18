import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const initialState = {
  loading: false,
  errorData: {
    message: "",
    type: "",
    errors: [],
  },
  isError: false,
  data: {},
};

const dataSlice = createSlice({
  name: "data",
  initialState: initialState,
  extraReducers: (builder) => {},
});

export default dataSlice.reducer;
export const {} = dataSlice.actions;
