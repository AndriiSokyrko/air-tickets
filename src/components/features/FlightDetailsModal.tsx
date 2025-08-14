import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Stack
} from '@mui/material';
import type { Flight } from '../../types/flight';
import SeatGrid from "../share/SeatGrid";
import {addTicket} from "../../store/slices/cartSlice.ts";
import {useDispatch} from "react-redux";

interface FlightDetailsModalProps {
    open: boolean;
    onClose: () => void;
    flight: Flight | null;
}

export const FlightDetailsModal: React.FC<FlightDetailsModalProps> = ({ open, onClose, flight }) => {
    const dispatch= useDispatch();
    if (!flight) return null;
    function onBook(payload){
        dispatch(addTicket(payload));
    }
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Детали рейса</DialogTitle>
            <DialogContent dividers>
                <Stack spacing={1}>
                    <Typography variant="subtitle1"><b>Номер рейса:</b> {flight.id}</Typography>
                    <Typography variant="subtitle1"><b>Авиакомпания:</b> {flight.airline}</Typography>
                    <Typography variant="subtitle1"><b>Откуда:</b> {flight.from}</Typography>
                    <Typography variant="subtitle1"><b>Куда:</b> {flight.to}</Typography>
                    <Typography variant="subtitle1"><b>Время вылета:</b> {flight.departureTime}</Typography>
                    <Typography variant="subtitle1"><b>Время прибытия:</b> {flight.arrivalTime}</Typography>
                    <Typography variant="subtitle1"><b>Цена:</b> {flight.price} грн</Typography>
                    <Typography variant="body2" color="text.secondary">
                        <b>Осталось:</b>{flight.tickets.remaining || 'Нет дополнительной информации'}
                        <div></div>
                        <b>Куплено:</b>{flight.tickets.total || 'Нет дополнительной информации'}
                        <h1>Виберіть місце</h1>
                        <SeatGrid/>
                    </Typography>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Закрыть</Button>
            </DialogActions>
            <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => onBook?.(flight)}
                disabled={flight.tickets.remaining === 0}
            >
                {flight.tickets.remaining > 0 ? 'Book Now' : 'Sold Out'}
            </Button>
        </Dialog>
    );
};
