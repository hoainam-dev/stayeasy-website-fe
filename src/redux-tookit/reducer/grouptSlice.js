import { createSlice } from "@reduxjs/toolkit";

export const grouptSlice = createSlice({
  name: "groupt",
  initialState: {
    isOpenLoginModal: false,
    reloadLike: 0,
  },
  reducers: {
    openLoginForm: (state, action) => {
      state.isOpenLoginModal = !state.isOpenLoginModal;
    },
    reloadLike: (state, action) => {
      state.reloadLike += 1;
    },
  },
});
