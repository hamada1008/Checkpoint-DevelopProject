import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";

import orderReducer from "./orderReducer";
import editProfileReducer from "./editProfileReducer";
const store = configureStore({ reducer: { authR: authReducer, editProfileReducer ,orderReducer} });
export default store;
