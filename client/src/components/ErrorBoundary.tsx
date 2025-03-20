import React, { ErrorInfo, ReactNode } from 'react';
import logger from 'logging/logger';


interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

// We implement this as a class component rather than a SFC
// because error boundaries rely on lifecycle methods

class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error: Error): State | null {
        return { hasError: true, error: error, errorInfo: null };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        logger.logError(error);
        this.setState({ errorInfo: errorInfo })
    }

    render() {
        if (this.state.hasError) {
            return (
                <div>
                    <h2>Something went wrong, please try again later.</h2>
                    {/* For production environments, we would hide this error */}
                    {process.env.NODE_ENV !== 'production' &&
                        <div>
                            <div>{this.state.error && this.state.error.toString()}</div>
                            <div>{this.state.errorInfo && this.state.errorInfo.componentStack}</div>
                        </div>
                    }
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;