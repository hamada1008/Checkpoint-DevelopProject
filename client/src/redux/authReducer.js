import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: null,
  isAuth: false,
  userData: {},
};

export const getAuth = createAsyncThunk("auth/isAuth", async (payload) => {
  await axios.post("http://localhost:5000/api/auth/login", payload);
});

export const registerAuth = createAsyncThunk(
  "registerAuth/isAuth",
  async (payload) => {
    const data = await axios.post(
      "http://localhost:5000/api/auth/register",
      payload
    );
    // console.log(data);

    return data;
  }
);

const authReducer = createSlice({
  name: "authentication",
  initialState,

  extraReducers: {
    [getAuth.pending]: (state) => {
      state.status = "loading";
    },
    [getAuth.fulfilled]: (state) => {
      state.status = "succeeded";
      state.isAuth = true;
    },
    [getAuth.rejected]: (state) => {
      state.status = "rejected";
    },
    [registerAuth.pending]: (state) => {
      state.status = "loading";
    },
    [registerAuth.fulfilled]: (state, action) => {
      console.log(action);
      state.status = "succeeded";
      state.isAuth = true;
      localStorage.setItem("isAuth", state.isAuth);
      localStorage.setItem("id", action.payload.data._id);
      localStorage.setItem("type", action.meta.arg.type);

      // state.userData = { ...action.payload.data };
    },
    [registerAuth.rejected]: (state) => {
      state.status = "rejected";
      state.isAuth = false;
      localStorage.setItem("isAuth", state.isAuth);
    },
  },
});

export default authReducer.reducer;
