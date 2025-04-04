import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import axios from 'axios';

// Mock axios
jest.mock('axios');

describe('App Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  test('renders birthday calculator title', () => {
    render(<App />);
    const titleElement = screen.getByText(/Birthday Calculator/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('handles successful age calculation', async () => {
    // Mock successful API response
    axios.post.mockResolvedValueOnce({ data: { age: 25 } });

    render(<App />);
    
    // Find and fill the date input
    const dateInput = screen.getByLabelText(/birth date/i);
    fireEvent.change(dateInput, { target: { value: '1998-01-01' } });

    // Click the calculate button
    const calculateButton = screen.getByText(/Calculate Age/i);
    fireEvent.click(calculateButton);

    // Wait for and verify the result
    await waitFor(() => {
      expect(screen.getByText(/Your age is: 25 years/i)).toBeInTheDocument();
    });
  });

  test('handles API error', async () => {
    // Mock API error
    axios.post.mockRejectedValueOnce({
      response: { data: { error: 'Invalid date format' } }
    });

    render(<App />);
    
    // Find and fill the date input with invalid date
    const dateInput = screen.getByLabelText(/birth date/i);
    fireEvent.change(dateInput, { target: { value: 'invalid-date' } });

    // Click the calculate button
    const calculateButton = screen.getByText(/Calculate Age/i);
    fireEvent.click(calculateButton);

    // Wait for and verify the error message
    await waitFor(() => {
      expect(screen.getByText(/Invalid date format/i)).toBeInTheDocument();
    });
  });
}); 