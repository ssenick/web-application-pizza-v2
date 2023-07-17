import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


export const fetchPizzaItems = createAsyncThunk('items/fetchPizzaItems', async (params, thunkAPI) => {
   const {filter} = thunkAPI.getState()
   const {categoriesId, sort, search} = filter;
   const category = categoriesId === 0 ? '' : `&category=${categoriesId}`;
   const sortType = `?sortBy=${sort.type}&order=${sort.order}`;
   const searchValue = search ? `&name=${search}` : '';
   const {data} = await axios.get(`https://64a6157600c3559aa9c054f6.mockapi.io/items${sortType}${searchValue}${category}`);

   return data;
})


const initialState = {
   pizzas: [],
   status: {
      name:'loading',
      message:''
   }, // loading | success | error
}


export const pizzaSlice = createSlice({
   name: 'pizza',
   initialState,
   reducers: {
      setItems: (state, action) => {
         state.pizzas = action.payload
      },
   },
   extraReducers: {
      [fetchPizzaItems.pending]: (state) => {
         state.pizzas = []
         state.status.name = 'loading'
      },
      [fetchPizzaItems.fulfilled]: (state, action) => {
         state.pizzas = action.payload
         state.status.name = 'success'
      },
      [fetchPizzaItems.rejected]: (state,action) => {
         state.pizzas = []
         state.status.name = 'error'
         state.status.message = action.error.message
      }
   },
})
export const selectPizza = (state) => state.pizza
export const {setItems} = pizzaSlice.actions
export default pizzaSlice.reducer