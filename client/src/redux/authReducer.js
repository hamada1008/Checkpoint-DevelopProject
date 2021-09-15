import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: null,
  token: null,
};

export const loginAuth = createAsyncThunk("auth/isAuth", async (payload) => {
  const token = await axios.post(
    "http://localhost:5000/api/auth/login",
    payload
  );
  return token;
});

export const registerAuth = createAsyncThunk(
  "registerAuth/isAuth",
  async (payload) => {
    const token = await axios.post(
      "http://localhost:5000/api/auth/register",
      payload
    );
    return token;
  }
);
export const logoutAuth = createAsyncThunk("logoutAuth/isAuth", async () => {
  await axios.get("http://localhost:5000/api/auth/logout");
});

const authReducer = createSlice({
  name: "authentication",
  initialState,

  extraReducers: {
    [loginAuth.pending]: (state) => {
      state.status = "loading";
    },
    [loginAuth.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.token = action.payload.data;
      localStorage.setItem("token", state.token);
    },
    [loginAuth.rejected]: (state) => {
      state.status = "rejected";
      state.token = null;
      localStorage.clear();
    },
    [registerAuth.pending]: (state) => {
      state.status = "loading";
    },
    [registerAuth.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.token = action.payload.data;
      localStorage.setItem("token", state.token);
    },
    [registerAuth.rejected]: (state) => {
      state.status = "rejected";
      state.token = null;
      localStorage.clear();
    },
    [logoutAuth.pending]: (state) => {
      state.status = "loading";
    },
    [logoutAuth.fulfilled]: (state) => {
      state.status = "succeeded";
      state.token = null;
      localStorage.clear();
    },
    [logoutAuth.rejected]: (state) => {
      state.status = "rejected";
    },
  },
});

export default authReducer.reducer;
