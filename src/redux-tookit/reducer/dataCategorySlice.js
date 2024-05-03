import { createSlice } from "@reduxjs/toolkit";

export const dataCategorySlice = createSlice({
  name: "dataCategory",
  initialState: {
    isLoading: false,
    dataCategory: [],
  },
  reducers: {
    getDataCategoryRequest: (state) => {
      state.isLoading = true;
    },
    getDataCategorySuccess: (state, action) => {
      state.isLoading = false;
      state.dataCategory = action.payload;
      // console.log("payload: ", action.payload);
    },
    getDataCategoryFailure: (state) => {
      state.isLoading = false;
    },
  },
});

export default dataCategorySlice.reducer;
