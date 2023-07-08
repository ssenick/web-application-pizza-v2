import { configureStore } from '@reduxjs/toolkit'

import categoryReducer from './slices/filterSlice'

export const store = configureStore({
   reducer: {
      filter: categoryReducer,
   }
})