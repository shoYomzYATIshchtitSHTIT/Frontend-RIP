import { configureStore } from '@reduxjs/toolkit'
import filtersReducer from './slices/filtersSlice'

const store = configureStore({
    reducer: {
        filters: filtersReducer
    },
    devTools: import.meta.env.DEV
})

// Экспортируем типы правильно
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Экспортируем сам store
export { store }