import { createSlice } from "@reduxjs/toolkit";

export const keySearchSlice = createSlice({
  name: "keySearch",
  initialState: {
    page: "",
    keySearch: "",
    address: "",
    checkin: "",
    checkout: "",
  },
  reducers: {
    setKeySearch: (state, action) => {
      state.keySearch = action.payload;
    },
    setPageSearch: (state, action) => {
      state.page = action.payload;
    },
    setAdderss: (state, action) => {
      state.address = action.payload;
    },
    setCheckinDate: (state, action) => {
      state.checkin = action.payload;
    },
    setCheckoutDate: (state, action) => {
      state.checkout = action.payload;
    },
  },
});
