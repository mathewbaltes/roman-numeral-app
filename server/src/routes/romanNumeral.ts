// We split this up into a /routes directory, but may be overkill for this small of an app. Since we
// only have one API it would be safe to just leave it like this for now.  But larger apps
// need a dedicated directory with router definitions and better nested structures.

import express, { Request, Response } from 'express';
import { convertIntegerToRomanNumeral } from '../helpers';
import { rateLimit } from 'express-rate-limit'
import { query, validationResult } from 'express-validator';

// We want to rate limit this route so users cannot abuse this.  In some cases
// it could be very expensive to calculate the response a user is requesting. In this case,
// it is very minor but still good practice.
const romanNumeralRateLimit = rateLimit({
  windowMs: 1 * 60 * 1000,  // 1 minute per rate limit
  max: 10                   // 10 requests per window
});

// Validator for roman numeral route to ensure that it is only a valid number
const romanNumeralNumberValidator = [
  query('query')
    .isInt({ min: 1, max: 3999 }) // Ensures an integer between 1 and 3999
    .withMessage('Number must be an integer between 1 and 3999'),
]

const router = express.Router();

router.get('/romannumeral', romanNumeralRateLimit, romanNumeralNumberValidator, (req: Request, res: Response): Response => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const query = req.query.query as string;
  const num = parseInt(query, 10);

  const romanNumeral = convertIntegerToRomanNumeral(num);

  return res.status(200).json({ "input": query, "output": romanNumeral });
});

export default router;