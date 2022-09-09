import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

import PasswordController from './controllers/PasswordController';
import UsersController from './controllers/UsersController';

const routes = Router();
const usersController = new UsersController();
const passwordController = new PasswordController();

routes.get('/', (_request, response) => response.json({ hello: 'world' }));

routes.get('/users', usersController.index);

routes.get(
	'/users/:id',
	celebrate({ [Segments.PARAMS]: { id: Joi.string().required() } }),
	usersController.show,
);

routes.post(
	'/users',
	celebrate({
		[Segments.BODY]: {
			name: Joi.string().required(),
			age: Joi.number().required().min(18),
			email: Joi.string().email().required(),
			password: Joi.string().required(),
			address: Joi.string().required(),
		},
	}),
	usersController.create,
);

routes.put(
	'/users/:id',
	celebrate({
		[Segments.PARAMS]: {
			id: Joi.string().required(),
		},
		[Segments.BODY]: {
			name: Joi.string().required(),
			age: Joi.number().required().min(18),
			email: Joi.string().email().required(),
			address: Joi.string().required(),
		},
	}),
	usersController.update,
);

routes.delete(
	'/users/:id',
	celebrate({ [Segments.PARAMS]: { id: Joi.string().required() } }),
	usersController.delete,
);

routes.patch(
	'/users/:id/change-password',
	celebrate({
		[Segments.PARAMS]: {
			id: Joi.string().required(),
		},
		[Segments.BODY]: Joi.object({
			oldPassword: Joi.string().required().min(6),
			password: Joi.string().required().min(6),
			passwordConfirmation: Joi.string().required().valid(Joi.ref('password')),
		})
			.with('oldPassword', 'password')
			.with('password', 'oldPassword')
			.with('password', 'passwordConfirmation'),
	}),
	passwordController.update,
);

export default routes;
