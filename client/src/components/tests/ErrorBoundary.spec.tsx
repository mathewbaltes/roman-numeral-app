import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from 'components/ErrorBoundary';
import logger from 'logging/logger';

jest.mock('logging/logger');

describe('ErrorBoundary', () => {
    const ThrowError = () => {
        throw new Error('Test error');
    };

    test('renders children without error', () => {
        render(
            <ErrorBoundary>
                <div>Child component</div>
            </ErrorBoundary>
        );
        expect(screen.getByText('Child component')).toBeInTheDocument();
    });

    test('renders error message when an error is thrown', () => {
        render(
            <ErrorBoundary>
                <ThrowError />
            </ErrorBoundary>
        );
        expect(screen.getByText('Something went wrong, please try again later.')).toBeInTheDocument();
    });

    test('logs error when an error is thrown', () => {
        render(
            <ErrorBoundary>
                <ThrowError />
            </ErrorBoundary>
        );
        expect(logger.logError).toHaveBeenCalledWith(expect.any(Error));
    });

    test('displays error details in development mode', () => {
        process.env.NODE_ENV = 'development';
        render(
            <ErrorBoundary>
                <ThrowError />
            </ErrorBoundary>
        );
        expect(screen.getByText('Error: Test error')).toBeInTheDocument();
        expect(screen.getByText(/at ThrowError/i)).toBeInTheDocument();
    });

    test('does not display error details in production mode', () => {
        process.env.NODE_ENV = 'production';
        render(
            <ErrorBoundary>
                <ThrowError />
            </ErrorBoundary>
        );
        expect(screen.queryByText('Error: Test error')).not.toBeInTheDocument();
        expect(screen.queryByText(/at ThrowError/i)).not.toBeInTheDocument();
    });
});