import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosErrorHandler } from "../../Utils/axiosErrorHandler";

export const userLogin = createAsyncThunk(
  "user/submitLoginForm",
  async (formdata) => {
    try {
      let options = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      const { data: all } = await axios.post(
        "http://localhost:8000/api/login",
        formdata,
        options
      );
      return all.data;
    } catch (error) {
      return axiosErrorHandler(error);
    }
  }
);

export const userLogout = createAsyncThunk("user/userLogout", async (token) => {
  try {
    let options = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };

    let { data } = await axios.post(
      "http://localhost:8000/api/logout",
      {},
      options
    );
    console.log(data);
    return data;
  } catch (error) {
    return axiosErrorHandler(error);
  }
});

export const LoginSlice = createSlice({
  name: "login",
  initialState: {
    isLoading: false,
    user: {},
    token: localStorage.getItem("auth-token")
      ? localStorage.getItem("auth-token")
      : null,
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      if (action.payload.token) {
        localStorage.setItem("auth-token", action.payload.token);
      }
      state.isLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.isLoading = false;
      state.user = {};
      state.token = null;
    });

    //user logout builder
    builder.addCase(userLogout.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(userLogout.fulfilled, (state, action) => {
      if (action.payload.message) {
        localStorage.removeItem("auth-token");
      }
      state.isLoading = false;
      state.user = {};
      state.token = null;
    });
    builder.addCase(userLogout.rejected, (state, action) => {
      state.isLoading = false;
      state.user = {};
      state.token = null;
    });
  },
});

//export state
export const LoginState = (state) => state.auth;
export default LoginSlice.reducer;
