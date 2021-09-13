import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: null,
  isAuth: false,
};

export const getAuth = createAsyncThunk(
  "auth/isAuth",
  async (payload) => {
    await axios.post("http://localhost:5000/api/auth/login", payload);
  }
);

export const registerAuth = createAsyncThunk(
  "registerAuth/isAuth",
  async (payload) => {
    await axios.post("http://localhost:5000/api/auth/register", payload);
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
    [registerAuth.fulfilled]: (state) => {
      state.status = "succeeded";
      state.isAuth = true;
    },
    [registerAuth.rejected]: (state) => {
      state.status = "rejected";
    }


  }
});

export default authReducer.reducer;
