import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosErrorHandler } from "../../Utils/axiosErrorHandler";

export const userRegistration = createAsyncThunk(
  "user/submitRegistrationForm",
  async (formdata) => {
    try {
      let options = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data: all } = await axios.post(
        "http://laravelapi.almamun.me/api/register",
        formdata,
        options
      );
      return all.data;
    } catch (error) {
      return axiosErrorHandler(error);
    }
  }
);

export const RegisterSlice = createSlice({
  name: "registration",
  initialState: { isLoading: false, user: {}, message: null },
  extraReducers: (builder) => {
    builder.addCase(userRegistration.pending, (state) => {
      state.isLoading = true;
      state.message = null;
    });
    builder.addCase(userRegistration.fulfilled, (state, action) => {
      console.log("fulfiled");
      state.isLoading = false;
      state.user = action.payload.user;
      state.message = "Successfully Registered";
    });
    builder.addCase(userRegistration.rejected, (state, action) => {
      state.isLoading = false;
      state.user = {};
      state.message = "Error Occured";
    });
  },
});

//export state
export const RegistrationState = (state) => state.registration;
export default RegisterSlice.reducer;
