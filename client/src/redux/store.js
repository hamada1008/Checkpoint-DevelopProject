import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import editProfileReducer from "./editProfileReducer";
const store = configureStore({ reducer: { authR: authReducer, editProfileReducer } });
export default store;
