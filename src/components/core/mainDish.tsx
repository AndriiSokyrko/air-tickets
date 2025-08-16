import React, {useState} from 'react';
import CartModal from "../features/CartModal.tsx";
import {FlightDetailsModal} from "../features/FlightDetailsModal.tsx";
import Content from "../share/Content.tsx";
import {FlightCard} from "../features/FlightCard.tsx";
import Pagination from "../features/Pagination.tsx";
import type {Flight} from "../../types/flight.ts";

const MainDish: React.FC = () => {
    const [detailsOpen, setDetailsOpen] = useState(false);

    const handleClose=()=>{
        setShowCart(false)
    }

    const [page, setPage] = useState(1);

    const itemsPerPage = 6; // сколько карточек на одной странице
    const totalPages = Math.ceil(list.length / itemsPerPage);
    const currentFlights = list.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );
    const handlePageChange = (value: number) => {
        setPage(value);
    };
    const handleOpenDetails = (id: string) => {
        const data = list.find(it=>it.id===id)
        setSelectedFlight(data);
        setDetailsOpen(true);
    };
    const handleCloseDetails = () => {
        setSelectedFlight(null);
        setDetailsOpen(false);
    };
    interface FlightDetailsModalProps {
        open: boolean;
        onClose: () => void;
        flight: Flight | null;
    }

    return (
        <>

            <FlightDetailsModal
                open={detailsOpen}
                onClose={handleCloseDetails}
                flight={selectedFlight}
            />

            <Content>
                {Array.isArray(currentFlights) && currentFlights.map((flight) => (
                    <FlightCard key={flight.id} flight={flight} onOpenDetails={handleOpenDetails}/>
                ))}

            </Content>
            <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
            />
        </>
    );
};

export default MainDish;