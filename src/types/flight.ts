export interface TicketInfo {
    total: number;
    remaining: number;
}

export interface Flight {
    id: string;
    airline: string;
    from: string;
    to: string;
    departureTime: string; // ISO-дата, например "2025-05-01T10:00:00Z"
    arrivalTime: string;
    price: number;
    terminal: string;
    gate: string;
    tickets: TicketInfo;
}

export interface FlightsState {
    originList: Flight[];
    list: Flight[];
    current: Flight | null;
    loading: boolean;
    error: string | null;
}

export interface InfoSeat {
    id: string;
    row: number;
    seatNumber: number;
    status?: 'free' | 'occupied' | 'selected';
}
export interface InfoTicket {
    flight: Flight;
    info: InfoSeat;
}