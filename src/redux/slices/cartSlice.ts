import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../store";
import {PizzaCartItem, PizzaCartItemAction} from "../../@types/Typs";
import {calcTotalValue} from "../../utils/getCartFromLS";


export interface CartSliceType {
    items: PizzaCartItem[],
    totalPrice: number,
    totalItems: number,
}

// const initialState:CartSliceType = {
//    items: [],
//    totalPrice: 0,
//    totalItems: 0,
// }

export const getCartFromLS = () => {
    const data = localStorage.getItem('dataCart')
    const items = data ? JSON.parse(data) : []
    const totalPrice = calcTotalValue(items).totalPrice
    const totalItems = calcTotalValue(items).countItems
    console.log(items)
    return {
        items: items as PizzaCartItem[],
        totalPrice,
        totalItems,
    }
}

const initialState: CartSliceType = {
    items: getCartFromLS().items,
    totalPrice: getCartFromLS().totalPrice,
    totalItems: getCartFromLS().totalItems,
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addPizzasReducer: (state: CartSliceType, action: PayloadAction<PizzaCartItem>) => {
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

            state.totalItems++
            state.totalPrice = state.totalPrice + action.payload.price


        },
        removeItemsGroup: (state: CartSliceType, action: PayloadAction<PizzaCartItemAction>) => {
            state.items = state.items.filter(item =>
                item.id !== action.payload.id
                || item.typeActive !== action.payload.typeActive
                || item.sizeActive !== action.payload.sizeActive)

            state.totalPrice = state.totalPrice - action.payload.itemsPrices
            state.totalItems = state.totalItems - action.payload.countItems
        },
        minusCountPizza: (state: CartSliceType, action: PayloadAction<PizzaCartItemAction>) => {
            const countItems = state.items.find(item =>
                item.id === action.payload.id
                && item.typeActive === action.payload.typeActive
                && item.sizeActive === action.payload.sizeActive)

            if (countItems?.countItems && countItems.countItems > 1) {
                countItems.countItems--;
                countItems.itemsPrices = countItems.itemsPrices - action.payload.price
                state.totalItems--
                state.totalPrice = state.totalPrice - action.payload.price
            }

        },
        plusCountPizza: (state: CartSliceType, action: PayloadAction<PizzaCartItemAction>) => {
            const countItems = state.items.find(item =>
                item.id === action.payload.id
                && item.typeActive === action.payload.typeActive
                && item.sizeActive === action.payload.sizeActive)
            countItems?.countItems && countItems.countItems++;
            if (countItems?.itemsPrices) {
                countItems.itemsPrices = countItems.itemsPrices + action.payload.price
            }
            state.totalItems++
            state.totalPrice = state.totalPrice + action.payload.price
        },
        clearAllPizzas: (state: CartSliceType) => {
            state.items = [];
            state.totalPrice = 0;
            state.totalItems = 0;

        }
    },
})


export const selectCart = (state: RootState) => state.cart
export const {addPizzasReducer, clearAllPizzas, removeItemsGroup, minusCountPizza, plusCountPizza} = cartSlice.actions
export default cartSlice.reducer