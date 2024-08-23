import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, TablePagination, Alert } from '@mui/material';

const MyTable = ({ tableDataUpdated }) => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [showAlert, setshowAlert] = useState(false);
    useEffect(() => {
        fetchData();
    }, [tableDataUpdated]);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:1880/getsensordata');
            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleDeleteRow = async (id) => {
        // need to call the delete api and delete the data from the data based /deleterecord
        try {

            const response = await fetch('http://localhost:1880/deleterecord', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id })
            })

            if (response.ok) {
                setData(data => data.filter(row => row.id !== id));
                setshowAlert(true)
            } else {
                console.error('Failed to delete row');
            }
        }

        catch (error) {
            console.log('error deleting row');
        }
    }


    const filteredRows = data.filter(row =>
        Object.values(row).some(value =>
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const handleCloseAlert = () => {
        setshowAlert(false)
    }
    return (
        <div>
            <TextField
                label="Search"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ marginBottom: '20px' }}
            />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Temperature</TableCell>
                            <TableCell>Humidity</TableCell>
                            <TableCell>Pressure</TableCell>
                            <TableCell>Timestamp</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{row.temperature}</TableCell>
                                <TableCell>{row.humidity}</TableCell>
                                <TableCell>{row.pressure}</TableCell>
                                <TableCell>{row.timestamp}</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleDeleteRow(row.id)} color="secondary">Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredRows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            {
                showAlert && <Alert severity='success' onClose={handleCloseAlert}>
                    Data Deleted Successfully!
                </Alert>
            }
        </div>
    );
};

export default MyTable;
