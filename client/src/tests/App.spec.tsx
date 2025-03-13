import React from 'react';
import { render, screen } from '@testing-library/react';
import { defaultTheme, Provider } from '@adobe/react-spectrum';
import App from 'App';

describe('App', () => {
  test('renders the RomanNumeralForm component', () => {
    render(<Provider theme={defaultTheme}><App /></Provider>);
    expect(screen.getByLabelText(/Enter a number/i)).toBeInTheDocument();
  });
});