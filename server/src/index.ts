import app from './app';
import { loggingMiddleware } from './logging/logger';

const PORT = process.env.PORT || 8080;

// Middleware to log requests
app.use(loggingMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
export default app;
