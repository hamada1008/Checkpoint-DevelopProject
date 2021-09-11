import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    status: null,
    isAuth: false
}

export const getAuth = createAsyncThunk(
    'auth/isAuth',
    async (payload, { dispatch }) => {
        console.log(payload);
        //const {userName, password, type} = payload;
        await axios.post("http://localhost:5000/api/auth/login", payload, () => {
            console.log("Hello")
        })
    }

)
const authReducer = createSlice({
    name: "authentication",
    initialState,

    extraReducers: {
        [getAuth.pending]: (state) => { state.status = "loading" },
        [getAuth.fulfilled]: (state) => {
            state.status = "succeeded"
            state.isAuth = true
        },
        [getAuth.rejected]: (state) => { state.status = "rejected" },

    }
});


export default authReducer.reducer

