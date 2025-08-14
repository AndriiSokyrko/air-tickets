// SeatGrid.tsx
import React, { useState } from 'react';
import { generateSeats, Seat } from '../../helper/seatsGenerator';
import { useDispatch } from 'react-redux';
import { addTicket } from '../../store/slices/cartSlice';
import EventSeatIcon from '@mui/icons-material/EventSeat';

const SeatGrid: React.FC = () => {
    const dispatch = useDispatch();
    const [seats, setSeats] = useState<Seat[]>(() => generateSeats(10, 6));

    const handleSelectSeat = (seat: Seat) => {
        if (seat.status === 'occupied') return;
        if (seat.status === 'selected') {
            setSeats((prev) =>
                prev.map((s) =>
                    s.id === seat.id ? { ...s, status: 'free' } : s
                )
            );
        }
        if (seat.status === 'free') {
            setSeats((prev) =>
                prev.map((s) =>
                    s.id === seat.id ? { ...s, status: 'selected' } : s
                )
            );
            dispatch(addTicket({ id: seat.id, row: seat.row, seatNumber: seat.seatNumber }));
        }
    };

    return (
        <div style={{ display: 'grid', gap: '8px' }}>
            {Array.from({ length: 10 }, (_, rowIndex) => (
                <div key={rowIndex} style={{ display: 'flex', gap: '6px' }}>
                    {seats
                        .filter((s) => s.row === rowIndex + 1)
                        .map((seat) => (
                            <EventSeatIcon
                                key={seat.id}
                                onClick={() => handleSelectSeat(seat)}
                                style={{
                                    fontSize: '32px',
                                    cursor: seat.status === 'occupied' ? 'not-allowed' : 'pointer',
                                    color:
                                        seat.status === 'occupied'
                                            ? 'red'
                                            : seat.status === 'selected'
                                                ? 'blue'
                                                : 'green',
                                }}
                            />
                        ))}
                </div>
            ))}
        </div>
    );
};

export default SeatGrid;
