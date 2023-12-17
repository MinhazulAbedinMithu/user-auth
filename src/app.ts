import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import notFoundHandler from './app/middlewares/notFoundHandler';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import { userRoutes } from './app/modules/auth/user.route';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/api/auth', userRoutes);
app.get('/', (req: Request, res: Response) => {
  res.json('App is live');
});

app.use(globalErrorHandler);
app.use(notFoundHandler);
export default app;
