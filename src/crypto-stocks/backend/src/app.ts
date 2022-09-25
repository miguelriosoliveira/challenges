import { errors } from 'celebrate';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { router } from './router';

export const app = express();
app.disable('x-powered-by');
app.use(cors());
app.use(morgan('dev'));
app.use(router);
app.use(errors());
