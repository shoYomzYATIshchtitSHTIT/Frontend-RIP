import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { IntervalFilters } from '../../types/interval'

interface FiltersState {
    filters: IntervalFilters
}

const initialState: FiltersState = {
    filters: {}
}

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setTitleFilter: (state, action: PayloadAction<string>) => {
            state.filters.title = action.payload
        },
        setToneMinFilter: (state, action: PayloadAction<number>) => {
            state.filters.toneMin = action.payload
        },
        setToneMaxFilter: (state, action: PayloadAction<number>) => {
            state.filters.toneMax = action.payload
        },
        resetFilters: (state) => {
            state.filters = {}
        },
        setFilters: (state, action: PayloadAction<IntervalFilters>) => {
            state.filters = action.payload
        }
    }
})

export const {
    setTitleFilter,
    setToneMinFilter,
    setToneMaxFilter,
    resetFilters,
    setFilters
} = filtersSlice.actions

export default filtersSlice.reducer

import { useAppSelector } from '../../hooks/redux'

export const useFilters = () => useAppSelector((state) => state.filters.filters)
export const useTitleFilter = () => useAppSelector((state) => state.filters.filters.title)
export const useToneMinFilter = () => useAppSelector((state) => state.filters.filters.toneMin)
export const useToneMaxFilter = () => useAppSelector((state) => state.filters.filters.toneMax)