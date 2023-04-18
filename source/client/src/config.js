export const API_ROOT = "http://localhost:5000/api";
export const LINKS = {
  API_ROOT: API_ROOT,
  GET_DATA: `${API_ROOT}/data`,
};

export const REJECTED_ERROR = {
  message: "server did not respond",
  type: "SERVER ERROR",
};

export const THUNK_STATUS = {
  IDLE: "IDLE",
  LOADING: "LOADING",
  ERROR: "ERROR",
  FULFILLED: "FULFILLED",
};

export const STATUS = {
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
};
