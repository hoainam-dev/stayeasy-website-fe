import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
    totalRecord: 0,
  },
  reducers: {
    increase: (state, action) => {
      state.value += 1;
      console.log("couter: ", state.value);
    },
    descrease: (state, action) => {
      state.value -= 1;
    },
    totalRecord: (state, action) => {
      state.totalRecord = action.payload;
    },
  },
});
