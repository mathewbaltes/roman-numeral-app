import { Request, Response, NextFunction } from 'express';
import { createLogger, format, transports } from 'winston';

// Winston logger configuration
const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    transports: [
        new transports.Console(),
        // We could also write to files, but in this example we just do console
        // new transports.File({ filename: 'error.log', level: 'error' }),
        // new transports.File({ filename: 'combined.log' })
    ]
});

const loggingMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // We log this to the console and to a file
    logger.info(`${req.method} ${req.url}`);
    next();
}

export {
    logger,
    loggingMiddleware,
}
