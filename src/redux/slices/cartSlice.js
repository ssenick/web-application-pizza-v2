import {createSlice} from '@reduxjs/toolkit'

const initialState = {
   items: [],
   totalPrice: 0,
   totalItems: 0,
}

export const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      addPizzasReducer: (state, action) => {
         const countItems = state.items.filter(item => {
            if (item.id === action.payload.id && item.typeActive === action.payload.typeActive && item.sizeActive === action.payload.sizeActive) {
               return item
            }
         })
         if (countItems.length > 0) {
            countItems[0].countItems += 1;
            countItems[0].itemsPrices = countItems[0].price * countItems[0].countItems;
         } else {
            state.items = [...state.items, action.payload]
         }
         state.totalPrice = state.totalPrice + action.payload.price
         state.totalItems += 1
      },
      clearAllPizzas: (state) => {

         state.items = [];
         state.totalPrice = 0;
         state.totalItems = 0;

      }
   },
})

export const {addPizzasReducer, clearAllPizzas} = cartSlice.actions
export default cartSlice.reducer