import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "loading",
  userDataAfterUpdate: [],
};

export const editProfile = createAsyncThunk(
  "editProfile/isEdited",
  async (payload) => {
    //console.log(payload)
    const data = await axios.patch(
      "http://localhost:5000/api/profile",
      payload
    );
    return data;
    //console.log(data)
  }
);

export const getEditedProfileData = createAsyncThunk(
  "editedProdile/isUpdated",
  async (payload) => {
    const data = await axios.post("http://localhost:5000/api/profile", payload);
    return data;
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
    [getEditedProfileData.pending]: (state) => {
      state.status = "loading";
    },
    [getEditedProfileData.fulfilled]: (state, action) => {
      console.log(action);
      state.status = "succeeded";
      state.userDataAfterUpdate = action.payload.data;
    },
    [getEditedProfileData.rejected]: (state) => {
      state.status = "rejected";
      state.userDataAfterUpdate = initialState.userDataAfterUpdate
    },
  },
});

export default editProfileReducer.reducer;
