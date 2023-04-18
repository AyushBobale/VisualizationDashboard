import { combineReducers, configureStore } from "@reduxjs/toolkit";

import dataSlice from "./slices/dataSlice.js";

const rootReducer = combineReducers({
  data: dataSlice,
});

export default configureStore({
  reducer: {
    rootReducer: rootReducer,
  },
  // middleware: [thunk],
});
