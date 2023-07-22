import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {PizzaItem} from "../../@types/Typs";
import {RootState} from "../store";

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}
export interface Pizza {
    pizzas: PizzaItem[],
    status: {
        name: Status,
        message: string
    }
}



export const fetchPizzaItems = createAsyncThunk<PizzaItem[],void,{state: RootState }>('items/fetchPizzaItems', async (params, {getState}) => {
    const {filter} = getState()
    const {categoriesId, sort, search} = filter;
    const category = categoriesId === 0 ? '' : `&category=${categoriesId}`;
    const sortType = `?sortBy=${sort.type}&order=${sort.order}`;
    const searchValue = search ? `&name=${search}` : '';
    const {data} = await axios.get<PizzaItem[]>(`https://64a6157600c3559aa9c054f6.mockapi.io/items${sortType}${searchValue}${category}`);

    return data
})


const initialState: Pizza = {
    pizzas: [],
    status: {
        name: Status.LOADING,
        message: ''
    }, // loading | success | error
}


export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems: (state: Pizza, action: PayloadAction<PizzaItem[]>) => {
            state.pizzas = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzaItems.pending, (state: Pizza, action) => {
            state.status.name = Status.LOADING
            state.pizzas = []
        })
        builder.addCase(fetchPizzaItems.fulfilled, (state: Pizza, action:PayloadAction<PizzaItem[]>) => {
            state.pizzas = action.payload
            state.status.name = Status.SUCCESS

        })
        builder.addCase(fetchPizzaItems.rejected, (state: Pizza, action) => {
            state.pizzas = []
            state.status.name = Status.ERROR
            if(action.error.message){
                state.status.message = action.error.message
            }

        })
    }
    // extraReducers: {
    //    [fetchPizzaItems.pending]: (state:Pizza) => {
    //       state.pizzas = []
    //       state.status.name = 'loading'
    //    },
    //    [fetchPizzaItems.fulfilled]: (state:Pizza, action:PayloadAction<PizzaItem[]>) => {
    //       state.pizzas = action.payload
    //       state.status.name = 'success'
    //    },
    //    [fetchPizzaItems.rejected]: (state:Pizza,action) => {
    //       state.pizzas = []
    //       state.status.name = 'error'
    //       state.status.message = action.error.message
    //    }
    // },
})
export const selectPizza = (state: RootState) => state.pizza
export const {setItems} = pizzaSlice.actions
export default pizzaSlice.reducer