class Logger {
    logError(error: Error) {
        // @TODO We could add any sort of tooling here such as Sentry or Rollbar to log
        // errors to a service for monitoring and alerting.
        console.log(error);
    }
}

export default new Logger();