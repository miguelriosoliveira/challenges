import bcrypt, { hash } from 'bcrypt';
import mongoose from 'mongoose';
import supertest from 'supertest';

import User from '../models/User';
import app from '../server';

const request = supertest(app);

describe('PasswordController', () => {
	beforeAll(async () => {
		await mongoose.connect(process.env.MONGO_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		});
	});

	beforeEach(async () => {
		await User.deleteMany({});
	});

	it('changes the password of a user', async done => {
		const password = '123456';
		const newPassword = 'new-password';

		const hashedPassword = await hash(password, 8);
		const hashedNewPassword = await hash(newPassword, 8);

		const user = await User.create({
			name: 'Miguel Rios',
			age: 28,
			email: 'miguelriosoliveira@gmail.com',
			password: hashedPassword,
			address: 'Av. Paulista 1000 - São Paulo/SP',
		});

		jest.spyOn(bcrypt, 'hash').mockImplementationOnce(async () => {
			return hashedNewPassword;
		});

		const response = await request.patch(`/users/${user.id}/change-password`).send({
			oldPassword: password,
			password: newPassword,
			passwordConfirmation: newPassword,
		});

		expect(response.status).toBe(200);
		expect(response.body).toEqual({
			_id: user.id,
			name: 'Miguel Rios',
			age: 28,
			email: 'miguelriosoliveira@gmail.com',
			password: hashedNewPassword,
			address: 'Av. Paulista 1000 - São Paulo/SP',
		});

		done();
	});
});
