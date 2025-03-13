import express, {Request, Response} from 'express';
import cors from 'cors';
import RomanNumeralRoutes from './routes/romanNumeral';

const app = express();

app.use(cors());
app.use(express.json());

// We normally would have nested routes, but since this is the only route
// we will use it on the main app.
app.use(RomanNumeralRoutes);

app.get(/.*/, (req: Request, res: Response) => {
  return res.sendStatus(404);
});

export default app;