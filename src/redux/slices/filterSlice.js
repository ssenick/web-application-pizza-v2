import {createSlice} from '@reduxjs/toolkit'

const initialState = {
   categoriesId: 0,
   sort: {
      name: 'popularity',
      type: 'rating',
      order: 'desc'
   },
}

export const filterSlice = createSlice({
   name: 'filter',
   initialState,
   reducers: {
      categoryReducer: (state, action) => {
         state.categoriesId = action.payload
      },
      sortReducer: (state, action) => {
         state.sort = action.payload
      }
   },
})

export const {categoryReducer,sortReducer} = filterSlice.actions
export default filterSlice.reducer