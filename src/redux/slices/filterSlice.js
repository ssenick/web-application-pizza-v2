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
      },
      setFilter: (state,action) =>{
         state.categoriesId = Number(action.payload.categoriesId)
         state.sort = action.payload.sort
         state.search = action.payload.search
      }
   },
})
export const selectFilter = (state) => state.filter
export const {categoryReducer,sortReducer,searchReducer,setFilter} = filterSlice.actions
export default filterSlice.reducer