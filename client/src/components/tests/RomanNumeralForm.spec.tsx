import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { RomanNumeralForm } from 'components/RomanNumeralForm';
import getRomanNumeral from 'api/romanNumeral';
import { defaultTheme, Provider } from '@adobe/react-spectrum';

// Mock the getRomanNumeral API call
jest.mock('api/romanNumeral');

describe('RomanNumeralForm', () => {
    let Container: React.FC;

    beforeEach(() => {
        jest.clearAllMocks();
        Container = () => (<Provider theme={defaultTheme}><RomanNumeralForm /></Provider>);
    });

    test('renders the form', () => {
        render(<Container />);
        expect(screen.getByLabelText(/Enter a number/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Convert inputted number to roman numeral' })).toBeInTheDocument();
    });

    test('displays an error for invalid input', async () => {
        render(<Container />);
        const input = screen.getByLabelText(/Enter a number/i);
        const button = screen.getByRole('button', { name: 'Convert inputted number to roman numeral' });

        fireEvent.change(input, { target: { value: '4000' } });
        fireEvent.click(button);

        await waitFor(() => {
            expect(screen.getByText(/Please enter a valid number between 1 and 3999/i)).toBeInTheDocument();
        });
    });

    test('clears error state after changing input', async () => {
        render(<Container />);
        const input = screen.getByLabelText(/Enter a number/i);
        const button = screen.getByRole('button', { name: 'Convert inputted number to roman numeral' });

        fireEvent.change(input, { target: { value: '4000' } });
        fireEvent.click(button);

        await waitFor(() => {
            expect(screen.getByText(/Please enter a valid number between 1 and 3999/i)).toBeInTheDocument();
        });

        fireEvent.change(input, { target: { value: '3000' } });

        return waitFor(() => {
            expect(screen.queryByText(/Please enter a valid number between 1 and 3999/i)).not.toBeInTheDocument();
        });
    });

    test('displays the roman numeral result for valid input', async () => {
        (getRomanNumeral as jest.Mock).mockResolvedValueOnce({
            json: async () => ({ output: 'X' })
        });

        render(<Container />);
        const input = screen.getByLabelText(/Enter a number/i);
        const button = screen.getByRole('button', { name: 'Convert inputted number to roman numeral' });

        fireEvent.change(input, { target: { value: '10' } });
        fireEvent.click(button);

        await waitFor(() => {
            expect(screen.getByText(/Roman numeral: X/i)).toBeInTheDocument();
        });
    });

    describe('json response', () => {
        test('handle successful responses from api', async () => {
            (getRomanNumeral as jest.Mock).mockResolvedValueOnce({
                json: async () => ({ output: 'X', input: '10' })
            });

            render(<Container />);
            const input = screen.getByLabelText(/Enter a number/i);
            const button = screen.getByRole('button', { name: 'Convert inputted number to roman numeral' });

            fireEvent.change(input, { target: { value: '10' } });
            fireEvent.click(button);

            await waitFor(() => {
                expect(screen.getByText(/Roman numeral: X/i)).toBeInTheDocument();
            });
        });

        test('handle error response from api', async () => {
            (getRomanNumeral as jest.Mock).mockResolvedValueOnce({
                json: async () => ({ errors: [{ msg: 'some invalid number' }] })
            });

            render(<Container />);
            const input = screen.getByLabelText(/Enter a number/i);
            const button = screen.getByRole('button', { name: 'Convert inputted number to roman numeral' });

            fireEvent.change(input, { target: { value: '10' } });
            fireEvent.click(button);

            await waitFor(() => {
                expect(screen.getByText(/some invalid number/i)).toBeInTheDocument();
            });
        });
    });

    test('handles api errors gracefully', async () => {
        (getRomanNumeral as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

        render(<Container />);
        const input = screen.getByLabelText(/Enter a number/i);
        const button = screen.getByRole('button', { name: 'Convert inputted number to roman numeral' });

        fireEvent.change(input, { target: { value: '10' } });
        fireEvent.click(button);

        await waitFor(() => {
            expect(screen.getByText(/An error occurred while converting the number to a roman numeral. Please try again later./i)).toBeInTheDocument();
            expect(screen.queryByText(/Roman numeral: X/i)).not.toBeInTheDocument();
        });
    });
});
