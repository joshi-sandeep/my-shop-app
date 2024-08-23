import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AllProductsView from './AllProductsView'; // Adjust the path as necessary
import getAllOrder from '../../Service'; // Adjust the path as necessary

// Mock the getAllOrder function
jest.mock('../../Service', () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe('AllProductsView Component', () => {
    it('renders loading state initially', () => {
        render(<AllProductsView />);
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('renders orders when data is successfully fetched', async () => {
        const mockOrders = [
            {
                _id: '66c0beb625aa2c41d31afb13',
                orderid: 12112,
                orderdate: '2023-11-17T00:00:00.000Z',
                status: 'shorts',
                orderitems: ['[abc, bcd, ahc]'],
                ordertotal: 7,
                userid: '12345',
                __v: 0,
            },
        ];

        getAllOrder.mockResolvedValueOnce(mockOrders);

        render(<AllProductsView />);

        await waitFor(() => {
            expect(screen.getByText('shorts')).toBeInTheDocument();
        });
    });

    it('renders no orders message when no orders are found', async () => {
        getAllOrder.mockResolvedValueOnce([]);

        render(<AllProductsView />);

        await waitFor(() => {
            expect(screen.getByText('No orders found.')).toBeInTheDocument();
        });
    });

    it('renders error message when there is an error', async () => {
        getAllOrder.mockRejectedValueOnce(new Error('Failed to fetch orders'));

        render(<AllProductsView />);

        await waitFor(() => {
            expect(screen.getByText('Error loading orders.')).toBeInTheDocument();
        });
    });
});
