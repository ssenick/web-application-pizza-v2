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
            countItems[0].countItems++;
            countItems[0].itemsPrices = countItems[0].price * countItems[0].countItems;
         } else {
            state.items = [...state.items, action.payload]
         }
         state.totalPrice = state.totalPrice + action.payload.price
         state.totalItems++

      },
      removeItemsGroup: (state, action) => {
         state.items =  state.items.filter(item =>
           item.id !== action.payload.id
           || item.typeActive !== action.payload.typeActive
           || item.sizeActive !== action.payload.sizeActive)

         state.totalPrice = state.totalPrice - action.payload.itemsPrices
         state.totalItems = state.totalItems - action.payload.countItems
      },
      minusCountPizza : (state, action) => {
         const countItems = state.items.find(item =>
            item.id === action.payload.id
            && item.typeActive === action.payload.typeActive
            && item.sizeActive === action.payload.sizeActive)

         if (countItems.countItems > 1) {
            countItems.countItems--;
            countItems.itemsPrices = countItems.itemsPrices - action.payload.price
            state.totalItems--
            state.totalPrice = state.totalPrice - action.payload.price
         }
         // state.totalPrice = state.totalPrice + action.payload.price
         // state.totalItems++
      },
      plusCountPizza : (state, action) => {
         const countItems = state.items.find(item =>
            item.id === action.payload.id
            && item.typeActive === action.payload.typeActive
            && item.sizeActive === action.payload.sizeActive)
         countItems.countItems++;
         countItems.itemsPrices = countItems.itemsPrices + action.payload.price
         state.totalItems++
         state.totalPrice = state.totalPrice + action.payload.price
      },
      clearAllPizzas: (state) => {
         state.items = [];
         state.totalPrice = 0;
         state.totalItems = 0;

      }
   },
})

export const {addPizzasReducer, clearAllPizzas, removeItemsGroup,minusCountPizza,plusCountPizza} = cartSlice.actions
export default cartSlice.reducer