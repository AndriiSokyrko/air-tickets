// src/store/cartSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {Flight} from "../../types/flight.ts";

interface Ticket {
    items: Flight;
    seatNumber?: number;

}
interface CartState {
    items: Ticket[];
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
    return { items: [], totalAmount: 0 };
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
        addTicket: (state, action: PayloadAction<Omit<Ticket, 'quantity' >>)=> {
            const existingTicket = state.items.find((t) => t.id === action.payload.id);
            if (existingTicket) {
                existingTicket.quantity += 1;
            } else {
                state.items.push({...action.payload, quantity: 1});

            }
            state.totalAmount = state.items.reduce(
                (sum, t) => sum + t.price * t.quantity,
                0
            );
            saveStateToLocalStorage(state);
        },
        removeTicket: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((t) => t.id !== action.payload);
            state.totalAmount = state.items.reduce(
                (sum, t) => sum + t.price * t.quantity,
                0
            );
        },
        updateQuantity:(state, action: PayloadAction<{ id: string; quantity: number }>) => {
            const ticket = state.items.find((t) => t.id === action.payload.id);
            if (ticket) {
                ticket.quantity = action.payload.quantity;
            }
            state.totalAmount = state.items.reduce(
                (sum, t) => sum + t.price * t.quantity, 0 );
        },
        clearCart:(state) => {    state.items = [];    state.totalAmount = 0; localStorage.removeItem('cart')},
    }
});

export const {addTicket, removeTicket, updateQuantity, clearCart} = cartSlice.actions;
export default cartSlice.reducer;
