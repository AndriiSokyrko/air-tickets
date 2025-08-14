import { configureStore } from '@reduxjs/toolkit';
import flightsReducer from './slices/flightsSlice';
import cartSlice from "./slices/cartSlice.ts";

export const store = configureStore({
    reducer: {
        cart: cartSlice,
        flights: flightsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;