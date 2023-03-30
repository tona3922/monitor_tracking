import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
// import { useNavigate } from "react-router-dom";

const initialState = {
    user: {
        email: '',
        name: '',
        gender: '',
        JWT_Token: process.env.JWT_Token
    }
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginSuccess: (state, user) => {

            // state = {
            //     ...state,
            //     user: user
            // }
            state.user = user.payload

        },

    },
})

// Action creators are generated for each case reducer function
export const { loginSuccess } = userSlice.actions

export const login = (info) => async dispatch => {
    // const navigate = useNavigate()
    await axios
        .post("http://localhost:8080/account/login", info)
        // .then((req) => {
        //     dispatch(loginSuccess(info))
        //     return 200
        // })
        // .catch((err) => { return 500 });
        .then((res) => {
            dispatch(loginSuccess(res.data))
            // navigate("/")
        })
        .catch((err) => console.log(err))

}

export const selectUser = (state) => state.user.user

export default userSlice.reducer