import * as Sentry from '@sentry/browser';

// Normally we would use some sort of secret handler to keep this safe and out of the codebase
// and insert when we build, but we will hardcode for this exercise.
const SENTRY_DSN = '123456';

class SentryLogger {
    constructor(dsn: string) {
        // Uncomment when active
        // Sentry.init({ dsn });
    }

    logError(error: Error) {
        // Sentry.captureException(error);
        // This console error could go somewhere else if we needed to store more contextual info.
        console.log(error);
    }
}

export default new SentryLogger(SENTRY_DSN);