import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import { RadarController } from './controllers';

export const router = Router();

router.get('/', (request, response) => response.send('Hello Word!'));
router.post(
	'/radar',
	celebrate({
		[Segments.BODY]: {
			protocols: Joi.array()
				.items(
					Joi.string().allow(
						'closest-enemies',
						'furthest-enemies',
						'assist-allies',
						'avoid-crossfire',
						'prioritize-mech',
						'avoid-mech',
					),
				)
				.required(),
			scan: Joi.array()
				.items(
					Joi.object().keys({
						coordinates: Joi.object()
							.keys({
								x: Joi.number(),
								y: Joi.number(),
							})
							.required(),
						enemies: Joi.object()
							.keys({
								type: Joi.string().allow('soldier', 'mech'),
								number: Joi.number(),
							})
							.required(),
						allies: Joi.number(),
					}),
				)
				.required(),
		},
	}),
	RadarController.radar,
);
