import {configureStore} from '@reduxjs/toolkit'

import categoryReducer from './slices/filterSlice'
import searchReducer from "./slices/searchSlice";

export const store = configureStore({
   reducer: {
      filter: categoryReducer,
      search: searchReducer,
   }
})