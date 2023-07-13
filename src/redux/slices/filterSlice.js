import {createSlice} from '@reduxjs/toolkit'

const initialState = {
   categoriesId: 0,
   sort: {
      name: 'popularity',
      type: 'rating',
      order: 'desc'
   },
   search:''
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
      },
      searchReducer: (state,action) => {
         state.search = action.payload
      }
   },
})

export const {categoryReducer,sortReducer,searchReducer} = filterSlice.actions
export default filterSlice.reducer