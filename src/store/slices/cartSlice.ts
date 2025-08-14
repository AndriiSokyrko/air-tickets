// src/store/cartSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {Flight, InfoSeat, InfoTicket} from "../../types/flight.ts";

interface CartState {
    items: InfoTicket[];
    quantity: number;
    totalAmount: number;
}

const loadStateFromLocalStorage = (): CartState => {
    try {
        const savedState = localStorage.getItem("cart");
        if (savedState) {
            return JSON.parse(savedState) as CartState;
        }
    } catch (err) {
        console.error("Ошибка при чтении корзины из localStorage", err);
    }
    return {items: [],quantity:0, totalAmount: 0};
};
const saveStateToLocalStorage = (state: CartState) => {
    try {
        localStorage.setItem("cart", JSON.stringify(state));
    } catch (err) {
        console.error("Ошибка при сохранении корзины в localStorage", err);
    }
};

const initialState: CartState = loadStateFromLocalStorage();
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addTicket: (state, action: PayloadAction<InfoTicket>) => {
            state.quantity += 1;
            state.items.push(action.payload);
            state.totalAmount += action.payload.flight.price
            saveStateToLocalStorage(state);
        },
        removeTicket: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((t) => t.flights.id !== action.payload);
            state.quantity =-1;
            state.items.push(action.payload);
            state.totalAmount =- state.items.find((t) => t.flights.id === action.payload).flights.price;
            saveStateToLocalStorage(state);
        },
        updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
            const ticket = state.items.find((t) => t.id === action.payload.id);
            if (ticket) {
                ticket.quantity = action.payload.quantity;
            }
            state.totalAmount = state.items.reduce(
                (sum, t) => sum + t.price * t.quantity, 0);
        },
        clearCart: (state) => {
            state.items = [];
            state.totalAmount = 0;
            localStorage.removeItem('cart')
        },
    }
});

export const {addTicket, removeTicket, updateQuantity, clearCart} = cartSlice.actions;
export default cartSlice.reducer;
