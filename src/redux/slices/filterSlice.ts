import {createSlice, Draft, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../store";
import {SortType} from "../../@types/Typs";


export interface FilterSliceState  {
    categoriesId: number;
    sort: SortType;
    search: string;
}


const initialState: FilterSliceState = {
    categoriesId: 0,
    sort: {
        name: 'popularity',
        type: 'rating',
        order: 'desc'
    },
    search: ''
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        categoryReducer: (state: FilterSliceState, action: PayloadAction<number>) => {
            state.categoriesId = action.payload
        },
        sortReducer: (state: FilterSliceState, action:PayloadAction<SortType>) => {
            state.sort = action.payload
        },
        searchReducer: (state: FilterSliceState, action: PayloadAction<string>) => {
            state.search = action.payload
        },
        setFilter: (state: FilterSliceState, action: PayloadAction<FilterSliceState>) => {
            state.categoriesId = Number(action.payload.categoriesId)
            state.sort = action.payload.sort
            state.search = action.payload.search
        }
    },
})
export const selectFilter = (state: RootState) => state.filter
export const {categoryReducer, sortReducer, searchReducer, setFilter} = filterSlice.actions

export default filterSlice.reducer
