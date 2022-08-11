/* eslint-disable no-await-in-loop */

import { hash } from 'bcrypt';
import { Response, Request } from 'express';

import AppError from '../errors/AppError';
import User from '../models/User';

interface IShowParamsProps {
	id: string;
}

interface ICreateBodyProps {
	name: string;
	age: number;
	email: string;
	password: string;
	address: string;
}

interface IUpdateParamsProps {
	id: string;
}

interface IUpdateBodyProps {
	name: string;
	age: number;
	email: string;
	address: string;
}

interface IDeleteParamsProps {
	id: string;
}

export default class UsersController {
	public async index(_request: Request, response: Response): Promise<Response> {
		const allUsers = await User.find();
		return response.json(allUsers);
	}

	public async show(request: Request, response: Response): Promise<Response> {
		const { id } = (request.params as unknown) as IShowParamsProps;

		const userFound = await User.findById(id);
		if (!userFound) {
			throw new AppError('User not found!', 404);
		}

		return response.json(userFound);
	}

	public async create(request: Request, response: Response): Promise<Response> {
		const { name, age, email, password, address } = request.body as ICreateBodyProps;

		const userExists = await User.findOne({ email });
		if (userExists) {
			throw new AppError('User already exists!');
		}
		const hashedPassword = await hash(password, 8);
		const user = await User.create({ name, age, email, password: hashedPassword, address });

		return response.json(user);
	}

	public async update(request: Request, response: Response): Promise<Response> {
		const { id } = (request.params as unknown) as IUpdateParamsProps;
		const { name, age, email, address } = request.body as IUpdateBodyProps;

		const userFound = await User.findById(id);
		if (!userFound) {
			throw new AppError('User not found!', 404);
		}
		userFound.name = name;
		userFound.age = age;
		userFound.email = email;
		userFound.address = address;
		await userFound.save();

		return response.json(userFound);
	}

	public async delete(request: Request, response: Response): Promise<Response> {
		const { id } = (request.params as unknown) as IDeleteParamsProps;

		const userFound = await User.findById(id);
		if (!userFound) {
			throw new AppError('User not found!', 404);
		}
		await userFound.deleteOne();

		return response.status(204).json();
	}
}
