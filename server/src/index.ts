import express from 'express';
import app from './app';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';

const PORT = process.env.PORT || 8080;

//  const SENTRY_DSN = 'abc';
// We would uncomment sentry in this case if we had a valid process.  We of course would also use
// a secrets managing service to handle the SENTRY_DNS.  It is disabled for this exercise.

// Sentry.init({
//   dsn: process.env.SENTRY_DSN,
//   tracesSampleRate: 1.0,
// });

// app.use(Sentry.Handlers.requestHandler());
// app.use(Sentry.Handlers.tracingHandler());

// This is our standard middleware logging, where we could persist this to the server logs for review.
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// app.use(Sentry.Handlers.errorHandler());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
export default app;
