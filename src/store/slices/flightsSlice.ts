import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchFlights, fetchFlightById } from '../../services/flight.ts';
import {FlightsState, Flight} from '../../types/flight.ts'
export const getFlights = createAsyncThunk<Flight[]>(
    'flights/getFlights',
        async (_, thunkAPI) => {
            try {
                return await fetchFlights();
            } catch (error: any) {
                return thunkAPI.rejectWithValue(error.message || 'Не удалось загрузить рейсы');
            }
        }
);

export const getFlightById = createAsyncThunk<Flight>(
    'flights/getFlightById',
        async (id, thunkAPI) => {
            try {
                return await fetchFlightById(id);
            } catch (error: any) {
                return thunkAPI.rejectWithValue(error.message || 'Не удалось загрузить рейс');
            }
        }
);



const initialState: FlightsState = {
    originList: [],
    list: [],
    current: null,
    loading: false,
    error: null,
};

const flightsSlice = createSlice({
    name: 'flights',
    initialState,
    reducers: {
        clearCurrentFlight: (state) => {
            state.current = null;
        },
        updateStateFlights:(state,action: PayloadAction<string>)=>{
            state.list = action.payload;
        },
        getFlightsStore: (state) => state.items


    },
    extraReducers: (builder) => {
        // Список рейсов
        builder.addCase(getFlights.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getFlights.fulfilled, (state, action: PayloadAction<Flight[]>) => {
            state.loading = false;
            state.list = action.payload;
            state.originList = action.payload;
        });
        builder.addCase(getFlights.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // Один рейс
        builder.addCase(getFlightById.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getFlightById.fulfilled, (state, action: PayloadAction<Flight>) => {
            state.loading = false;
            state.current = action.payload;
        });
        builder.addCase(getFlightById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export const { clearCurrentFlight, updateStateFlights, getFlightsStore } = flightsSlice.actions;
export default flightsSlice.reducer;
