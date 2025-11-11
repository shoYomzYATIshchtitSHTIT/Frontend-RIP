import { configureStore } from '@reduxjs/toolkit'
import filtersReducer from './slices/filtersSlice'

const store = configureStore({
    reducer: {
        filters: filtersReducer
    },
    devTools: import.meta.env.MODE !== 'production' || window.location.hostname.includes('github.io'),
})

// Экспортируем типы правильно
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Экспортируем сам store
export { store }