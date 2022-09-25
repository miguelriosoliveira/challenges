import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import { ExchangesController } from './controllers';

export const router = Router();

router.get('/', (request, response) => response.send('Hello Word!'));
router.get(
  '/exchange-routing',
  celebrate({ [Segments.QUERY]: { amount: Joi.number().required() } }),
  ExchangesController.routing,
);
