import React, { useEffect, useState } from 'react';
import getAllOrder from '../../Service';
import 'bootstrap/dist/css/bootstrap.min.css';
const AllProductsView = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true); // Optional: To show a loading state
    const [error, setError] = useState(null); // Optional: To handle errors

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getAllOrder();
                const formattedData = data.map(order => ({
                    ...order,
                    orderdate: new Date(order.orderdate)
                }));

                setOrders(formattedData);
            } catch (err) {
                console.error('Error retrieving orders:', err);
                setError(err); // Set the error state if needed
            } finally {
                setLoading(false); // Set loading to false after the fetch operation
            }
        };

        fetchOrders(); // Call the async function
    }, []);

    if (loading) return <p>Loading...</p>; // Optional: Show a loading indicator
    if (error) return <p>Error loading orders.</p>; // Optional: Show an error message

    return (
        <div>
            {orders.length > 0 ? (
                orders.map(order => (
                    <li key={order._id} className='border border-primary p-3'>
                        Order ID: {order.orderid}, Status: {order.status}, Total: ${order.ordertotal}
                    </li>
                ))
            ) : (
                <p>No orders found.</p> // Optional: Show a message when there are no orders
            )}
        </div>
    );
};

export default AllProductsView;
