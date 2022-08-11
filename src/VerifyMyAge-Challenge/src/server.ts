/* eslint-disable no-console */

import 'dotenv/config';
import 'express-async-errors';

import { errors } from 'celebrate';
import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

import AppError from './errors/AppError';
import routes from './routes';

const app = express();

mongoose.connect(process.env.MONGO_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
});

app.use(express.json());
app.use(routes);
app.use(errors());

app.use((err: Error, _request: Request, response: Response, _: NextFunction) => {
	if (err instanceof AppError) {
		return response.status(err.statusCode).json({ status: 'error', message: err.message });
	}

	console.error(err);

	return response.status(500).json({ status: 'error', messege: 'Internal Server Error' });
});

export default app;
