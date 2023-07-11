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
         const countItems = state.items.filter(item => item.id === action.payload.id)[0]
         const countType = state.items.filter(item => item.typeActive === action.payload.typeActive)[0]
         const countSize = state.items.filter(item => item.sizeActive === action.payload.sizeActive)[0]

         if (countItems && !countType && !countSize) {
            countItems.countItems += 1;

            countItems.itemsPrices = countItems.price * countItems.countItems;
         } else {
            state.items = [...state.items, action.payload]
         }
         state.totalPrice = state.totalPrice + action.payload.price
         state.totalItems += 1
      }
   },
})

export const {addPizzasReducer} = cartSlice.actions
export default cartSlice.reducer