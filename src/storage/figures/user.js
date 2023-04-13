import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: {
    email: "",
    name: "",
    gender: "",
    JWT_Token: process.env.JWT_Token,
    login: 0,
  },
};
const myprofile = {
  myuser: {
    email: "",
    password: "",
  },
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  myprofile,
  reducers: {
    loginSuccess: (state, user) => {
      console.log(user);
      state.user = {
        ...user.payload,
        login: 1,
      };
    },

    loginFailure: (state) => {
      state.user = {
        ...state.user,
        login: -1,
      };
    },

    registerSuccess: (state, user) => {
      console.log(user);
      state.user = {
        ...user.payload,
        login: 1,
      };
    },

    registerFailure: (state, user) => {
      state.user = {
        ...state.user,
        login: -1,
      };
    },

    logoutHome: (state) => {
      state.user = initialState.user;
    },
    editData: (state, info) => {
      state.user = {
        ...info.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  loginSuccess,
  loginFailure,
  registerSuccess,
  registerFailure,
  logoutHome,
  editData,
} = userSlice.actions;

export const login = (info) => async (dispatch) => {
  await axios
    .post("http://localhost:8080/account/login", info)
    .then((res) => {
      dispatch(loginSuccess(res.data));
    })
    .catch((err) => dispatch(loginFailure()));
};

export const register = (info) => async (dispatch) => {
  await axios
    .post("http://localhost:8080/account/register", info)
    .then((res) => {
      dispatch(registerSuccess(res.data));
    });
};
export const update = (info) => async (dispatch) => {
  await axios
    .post("http://localhost:8080/account/profile", info)
    .then((res) => {
      dispatch(editData(res.data));
    });
};
export const updatebyid = (info) => async (dispatch) => {
  await axios
    .post("http://localhost:8080/account/profile", info)
    .then((res) => {
      dispatch(editData(res.data));
    });
};

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
