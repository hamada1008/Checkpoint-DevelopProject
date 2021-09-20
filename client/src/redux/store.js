import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "./authReducer";

import orderReducer from "./orderReducer";
import editProfileReducer from "./editProfileReducer";
const store = configureStore({
    reducer: { authR: authReducer, editProfileReducer, orderReducer }, middleware: getDefaultMiddleware({
        serializableCheck: false
    })
});
export default store;
