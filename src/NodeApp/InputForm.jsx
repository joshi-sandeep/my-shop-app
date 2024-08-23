import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import axios from 'axios';

const InputForm = ({ updateTableData }) => {
    const [temperature, setTemperature] = useState('');
    const [humidity, setHumidity] = useState('');
    const [pressure, setPressure] = useState('');
    const [timestamp, setTimestamp] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:1880/addinfo', {
                temperature: parseFloat(temperature),
                humidity: parseFloat(humidity),
                pressure: parseFloat(pressure),
                timestamp: new Date(timestamp).toISOString()
            });
            // Optionally, you can add code to handle success, e.g., show a success message
            console.log('Data submitted successfully');
            updateTableData();
        } catch (error) {
            // Handle error, e.g., show an error message
            console.error('Error submitting data:', error);
        }
        // Clear form fields after submission
        setTemperature('');
        setHumidity('');
        setPressure('');
        setTimestamp('');
    };

    return (<div>
        <h1 style={{ justifyContent: 'center', textAlign: 'center' }}> Input Form</h1>
        <form onSubmit={handleSubmit}>
            <TextField
                label="Temperature"
                variant="outlined"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
                fullWidth
                required
                type="number"
                InputProps={{ inputProps: { min: 0 } }}
                style={{ marginBottom: '20px' }}
            />
            <TextField
                label="Humidity"
                variant="outlined"
                value={humidity}
                onChange={(e) => setHumidity(e.target.value)}
                fullWidth
                required
                type="number"
                InputProps={{ inputProps: { min: 0 } }}
                style={{ marginBottom: '20px' }}
            />
            <TextField
                label="Pressure"
                variant="outlined"
                value={pressure}
                onChange={(e) => setPressure(e.target.value)}
                fullWidth
                required
                type="number"
                InputProps={{ inputProps: { min: 0 } }}
                style={{ marginBottom: '20px' }}
            />
            <TextField
                label="Timestamp"
                variant="outlined"
                value={timestamp}
                onChange={(e) => setTimestamp(e.target.value)}
                fullWidth
                required
                type="datetime-local"
                InputLabelProps={{ shrink: true }}
                style={{ marginBottom: '20px' }}
            />
            <Box textAlign="center">
                <Button type="submit" variant="contained" color="primary">Submit</Button>
            </Box>
        </form>
    </div>
    );
};

 
export default InputForm;