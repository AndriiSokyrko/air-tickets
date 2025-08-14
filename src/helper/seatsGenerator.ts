
export interface Seat {
    id: string;
    row: number;
    seatNumber: number;
    status: 'free' | 'occupied' | 'selected';
}

export const generateSeats = (rows: number, seatsPerRow: number): Seat[] => {
    const seats: Seat[] = [];
    for (let row = 1; row <= rows; row++) {
        for (let seat = 1; seat <= seatsPerRow; seat++) {
            seats.push({
                id: `${row}-${seat}`,
                row,
                seatNumber: seat,
                status: Math.random() < 0.2 ? 'occupied' : 'free', // 20% зайнятих
            });
        }
    }
    return seats;
};
