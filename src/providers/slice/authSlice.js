import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
};
const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {},
});

export default authSlice;
