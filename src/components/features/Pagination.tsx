import React, { useState } from 'react';
import { Pagination, Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export default function FlightsPagination({onChange}) {
    const flights = useSelector((state: RootState) => state.flights.list);
    const [currentPage, setCurrentPage ] = useState(1);

    const itemsPerPage = 6;
    const totalPages = Math.ceil(flights.length / itemsPerPage);

    const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        onChange(value);
        setCurrentPage(value)
    };

    // текущие элементы
    const currentItems = flights.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <Stack spacing={2} sx={{display: 'flex', justifyContent:'center'}}>
            <Pagination
                count={totalPages}
                page={currentPage}
                onChange={ handleChange}
                color="primary"
            />
        </Stack>
    );
}
