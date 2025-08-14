import React, {useState} from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Stack, Box
} from '@mui/material';
import type {Flight, InfoSeat, InfoTicket} from '../../types/flight';
import SeatGrid from "../share/SeatGrid";
import {addTicket} from "../../store/slices/cartSlice.ts";
import {useDispatch} from "react-redux";

interface FlightDetailsModalProps {
    open: boolean;
    onClose: () => void;
    flight: Flight | null;
}

export const FlightDetailsModal: React.FC<FlightDetailsModalProps> = ({open, onClose, flight}) => {
    const dispatch = useDispatch();
    const [infoSeatFleight, setInfoSeatFleight] = useState<InfoSeat>(null)
    if (!flight) return null;
    function onBook(flight:InfoTicket) {
        dispatch(addTicket({flight, infoSeatFleight}));
        onClose(true)
    }
    const handleClick=(info:InfoSeat)=>{
        setInfoSeatFleight(info)
    }
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
        >
            <DialogTitle>Детали рейса</DialogTitle>

            <DialogContent dividers sx={{flexDirection: 'row', gap: 2}}>
                <Box sx={{display: 'inline-block'}}>
                    <Typography variant="subtitle1"><b>Номер рейса:</b> {flight.id}</Typography>
                    <Typography variant="subtitle1"><b>Авиакомпания:</b> {flight.airline}</Typography>
                    <Typography variant="subtitle1"><b>Откуда:</b> {flight.from}</Typography>
                    <Typography variant="subtitle1"><b>Куда:</b> {flight.to}</Typography>
                    <Typography variant="subtitle1"><b>Время вылета:</b> {flight.departureTime}</Typography>
                    <Typography variant="subtitle1"><b>Время прибытия:</b> {flight.arrivalTime}</Typography>
                    <Typography variant="subtitle1"><b>Цена:</b> {flight.price} грн</Typography>

                    <Typography variant="body2" color="text.secondary" sx={{mt: 1}}>
                        <b>Осталось:</b> {flight.tickets.remaining ?? 'Нет дополнительной информации'}<br/>
                        <b>Куплено:</b> {flight.tickets.total ?? 'Нет дополнительной информации'}
                    </Typography>
                    <Typography variant="h6" sx={{mb: 1}}>
                        Виберіть місце
                    </Typography>
                </Box>
                <SeatGrid onHandle={handleClick}/>
            </DialogContent>
            <DialogActions sx={{flexDirection: 'row', gap: 1}}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => onBook?.(flight)}
                    disabled={flight.tickets.remaining === 0}
                >
                    {flight.tickets.remaining > 0 ? 'Book Now' : 'Sold Out'}
                </Button>
                <Button onClick={onClose} color="primary">Закрыть</Button>

            </DialogActions>
        </Dialog>

    );
};
