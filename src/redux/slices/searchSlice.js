import {createSlice} from '@reduxjs/toolkit'

const initialState = {
      value: ''
}

export const searchSlice = createSlice({
   name: 'search',
   initialState,
   reducers: {
     searchReducer: (state,action) => {
         state.value = action.payload
     }
   },
})

export const {searchReducer} = searchSlice.actions
export default searchSlice.reducer