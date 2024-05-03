import { createSlice } from "@reduxjs/toolkit";

export const dataFilterSlice = createSlice({
  name: "dataFilter",
  initialState: {
    isLoading: false,
    dataFilter: [],
  },
  reducers: {
    getdataFilterRequest: (state) => {
      state.isLoading = true;
    },
    getdataFilterSuccess: (state, action) => {
      state.isLoading = false;
      state.dataFilter = action.payload;
      // console.log("payload: ", action.payload);
    },
    getdataFilterFailure: (state) => {
      state.isLoading = false;
    },
  },
});

export default dataFilterSlice.reducer;
