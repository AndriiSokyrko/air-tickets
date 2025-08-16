import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type {User} from "../../types/user.ts";



interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
}

// === Загружаем состояние из localStorage при старте ===
const savedAuth = localStorage.getItem('authState');
const initialState: AuthState = savedAuth
    ? JSON.parse(savedAuth)
    : {
        user: null,
        token: null,
        isAuthenticated: false,
    };

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        register: (
            state,
            action: PayloadAction<{ user: User; token: string }>
        ) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            localStorage.setItem('authState', JSON.stringify(state));
        },
        login: (
            state,
            action: PayloadAction<{ user: User; token: string }>
        ) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            // сохраняем в localStorage
            localStorage.setItem('authState', JSON.stringify(state));
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            // очищаем localStorage
            localStorage.removeItem('authState');
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
