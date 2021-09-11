import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import authReducer from "./authReducer";
const store = configureStore({ reducer: { authR: authReducer } })
export default store