/* eslint-disable no-await-in-loop */

import { hash, compare } from 'bcrypt';
import { Response, Request } from 'express';

import AppError from '../errors/AppError';
import User from '../models/User';

interface IUpdateParamsProps {
	id: string;
}

interface IUpdateBodyProps {
	oldPassword: string;
	password: string;
}

export default class PasswordController {
	async update(request: Request, response: Response): Promise<Response> {
		const { id } = (request.params as unknown) as IUpdateParamsProps;
		const { oldPassword, password } = request.body as IUpdateBodyProps;

		const userFound = await User.findById(id);
		if (!userFound) {
			throw new AppError('User not found');
		}

		const passwordMatch = await compare(oldPassword, userFound.password);
		if (!passwordMatch) {
			throw new AppError('Incorrect old password', 401);
		}

		userFound.password = await hash(password, 8);
		userFound.save();

		return response.json(userFound);
	}
}
