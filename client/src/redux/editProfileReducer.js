import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "loading",
};

export const editProfile = createAsyncThunk(
  "editProfile/isEdited",
  async (payload) => {
    axios.patch("http://localhost:5000/api/profile", payload);
  }
);

const editProfileReducer = createSlice({
  name: "editProfile",
  initialState,
  extraReducers: {
    [editProfile.pending]: (state) => {
      state.status = "loading";
    },
    [editProfile.fulfilled]: (state) => {
      state.status = "succeeded";
    },
    [editProfile.rejected]: (state, action) => {
      console.log(action);
      state.status = "rejected";
    },
  },
});

export default editProfileReducer.reducer;
