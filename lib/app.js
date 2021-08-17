import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import authsController from './controllers/auths.js';
import starsController from './controllers/stars.js';
import thingsController from './controllers/things.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use('/api/v1/auth', authsController);
app.use('/api/v1/stars', starsController);
app.use('/api/v1/things', thingsController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
