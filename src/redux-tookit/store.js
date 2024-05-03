import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./reducer/counterSlice";
import { dataExploreSlice } from "./reducer/dataExploreSlice";
import { dataHomeSlice } from "./reducer/dataHomeSlice";
import { dataDetailSlice } from "./reducer/dataDetailSlice";
import { dataCategorySlice } from "./reducer/dataCategorySlice";
import { dataFilterSlice } from "./reducer/dataFilterSlice";

import { keySearchSlice } from "./reducer/keySearchSlice";
import { grouptSlice } from "./reducer/grouptSlice";

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    dataExplore: dataExploreSlice.reducer,
    dataHome: dataHomeSlice.reducer,
    dataDetail: dataDetailSlice.reducer,
    dataCategory: dataCategorySlice.reducer,
    keySearch: keySearchSlice.reducer,
    groupt: grouptSlice.reducer,
    dataFilter: dataFilterSlice.reducer,
  },
});

export default store;
