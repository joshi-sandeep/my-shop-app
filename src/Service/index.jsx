
import axios from 'axios';

const getAllOrder = async () => {
    try {
        const response = await axios.get('http://localhost:4000/order/');
        console.log('Order data retrieved successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error retrieving order data:', error);
        throw error; // Rethrow the error to be caught in the caller
    }
};


 

export default getAllOrder