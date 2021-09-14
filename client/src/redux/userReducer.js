import { createSlice } from "@reduxjs/toolkit";
import { loadPlugin } from "@reduxjs/toolkit/node_modules/immer/dist/internal";

const initialState = [];

const userReducer = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    onLogin: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const {} = userReducer.actions;
export default userReducer.reducer;
