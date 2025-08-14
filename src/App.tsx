import './App.css';
import React, {useEffect, useState} from 'react';
import {FlightCard} from './components/features/FlightCard';
import AppBar from './components/features/AppBar';
import Header from './components/share/Header';
import IconNavigation from './components/features/IconNavigation';
import Footer from './components/share/Footer';
import Content from './components/share/Content';
import {Loader} from './components/share/Loader';
import {getFlights, getFlightsStore} from './store/slices/flightsSlice';
import {useDispatch, useSelector} from 'react-redux';
import type { RootState, AppDispatch } from './store/store.ts';
import ErrorDisplay from './components/share/ErrorDisplay';
import CartModal from "./components/features/CartModal";
import type {Flight} from "./types/flight.ts";
import {FlightDetailsModal} from "./components/features/FlightDetailsModal.tsx";
import Pagination from "./components/features/Pagination"
function App() {
    const dispatch = useDispatch<AppDispatch>();
    const {list, loading, error } = useSelector((state: RootState) => state.flights);
    const [showCart, setShowCart] = useState<boolean>(false)
    const [filteredFlights, setFilteredFlights] = useState<Flight[]>([])
    const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
    const [detailsOpen, setDetailsOpen] = useState(false);
    const handleClose=()=>{
        setShowCart(false)
    }
    const handleOpen=()=>{
        setShowCart(true)
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
    useEffect(() => {
        dispatch(getFlights());
    }, [dispatch]);
    return (
        <>
            <Header comp={AppBar} onOpen={handleOpen}/>
            {loading &&
                <Loader/>
            }
            {error &&
                <ErrorDisplay/>
            }
            {
                showCart && <CartModal open={showCart} onClose={handleClose}/>
            }
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
            <Footer comp={IconNavigation}/>
        </>
    );
}

export default App;
