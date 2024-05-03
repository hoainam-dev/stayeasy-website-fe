import { createSlice } from "@reduxjs/toolkit";

export const dataExploreSlice = createSlice({
  name: "dataExplore",
  initialState: {
    isLoading: false,
    dataExplore: [],
  },
  reducers: {
    getDataExploreRequest: (state) => {
      state.isLoading = true;
    },
    getDataExploreSuccess: (state, action) => {
      state.isLoading = false;
      state.dataExplore = action.payload;
    },
    getDataSearchExploreSuccess: (state, action) => {
      state.isLoading = false;
      state.dataSearchExplore = action.payload;
    },
    getDataExploreFailure: (state) => {
      state.isLoading = false;
    },
  },
});

export default dataExploreSlice.reducer;
