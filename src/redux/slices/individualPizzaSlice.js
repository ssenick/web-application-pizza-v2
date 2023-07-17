import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


export const fetchIndividualPizza = createAsyncThunk('items/fetchIndividualPizza', async (id, thunkAPI) => {
   // const {pizza} = thunkAPI.getState()
   // const pizzas = pizza.pizzas
//
//    const {data} = await axios.get(`https://64a6157600c3559aa9c054f6.mockapi.io/items${sortType}${searchValue}${category}`);
//
//    return data;

      const {data} = await axios.get('https://64a6157600c3559aa9c054f6.mockapi.io/items/' + id )
      return data

})


const initialState = {
   individualPizza: {},
   status: {
      name:'loading',
      message:''
   }, // loading | success | error
}


export const individualPizzaSlice = createSlice({
   name: 'individualPizza',
   initialState,
   reducers: {
      setIndividualPizza: (state, action) => {
         state.pizzas = action.payload
      },
   },
   extraReducers: {
      [fetchIndividualPizza.pending]: (state) => {
         state.individualPizza = {}
         state.status.name = 'loading'
      },
      [fetchIndividualPizza.fulfilled]: (state, action) => {
         state.individualPizza = action.payload
         state.status.name = 'success'
      },
      [fetchIndividualPizza.rejected]: (state,action) => {
         state.individualPizza = {}
         state.status.name = 'error'
         state.status.message = action.error.message
      }
   },
})
export const selectIndividualPizza = (state) => state.individualItem
export const {setIndividualPizza} = individualPizzaSlice.actions
export default individualPizzaSlice.reducer