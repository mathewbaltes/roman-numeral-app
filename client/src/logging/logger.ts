import {Metric} from 'web-vitals';
const ANALYTICS_URL = 'http://example.com/analytics'; // This would be the endpoint we would post to for analytics

class Logger {
    logError(error: Error) {
        // @TODO We could add any sort of tooling here such as Sentry or Rollbar to log
        // errors to a service for monitoring and alerting.
        console.log(error);
    }

    // Handles the react metrics and posts to an endpoint that we control
    sendToAnalytics(metric: Metric) {
        const body = JSON.stringify(metric);

        // Use `navigator.sendBeacon()` if available, falling back to `fetch()`
        if (navigator.sendBeacon) {
            navigator.sendBeacon(ANALYTICS_URL, body);
        } else {
            fetch(ANALYTICS_URL, { body, method: 'POST', keepalive: true });
        }
    }
}

export default new Logger();