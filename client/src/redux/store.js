import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import orderReducer from "./orderReducer";
const store = configureStore({ reducer: { authR: authReducer, orderReducer } });
export default store;
