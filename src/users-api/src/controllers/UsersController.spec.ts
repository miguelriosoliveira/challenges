import { hash } from 'bcrypt';
import mongoose from 'mongoose';
import supertest from 'supertest';

import User from '../models/User';
import app from '../server';

const request = supertest(app);

describe('UsersController', () => {
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

	it('gets the list of users', async done => {
		const password = await hash('123456', 8);

		const user = await User.create({
			name: 'Miguel Rios',
			age: 28,
			email: 'miguelriosoliveira@gmail.com',
			password,
			address: 'Av. Paulista 1000 - São Paulo/SP',
		});

		const response = await request.get('/users');

		expect(response.status).toBe(200);
		expect(response.body).toEqual([
			{
				_id: user.id,
				name: 'Miguel Rios',
				age: 28,
				email: 'miguelriosoliveira@gmail.com',
				password,
				address: 'Av. Paulista 1000 - São Paulo/SP',
			},
		]);

		done();
	});

	it('gets one user', async done => {
		const password = await hash('123456', 8);
		const user = await User.create({
			name: 'Miguel Rios',
			age: 28,
			email: 'miguelriosoliveira@gmail.com',
			password,
			address: 'Av. Paulista 1000 - São Paulo/SP',
		});

		const response = await request.get(`/users/${user.id}`);

		expect(response.status).toBe(200);
		expect(response.body).toEqual({
			_id: user.id,
			name: 'Miguel Rios',
			age: 28,
			email: 'miguelriosoliveira@gmail.com',
			password,
			address: 'Av. Paulista 1000 - São Paulo/SP',
		});

		done();
	});

	it('creates an user', async done => {
		const response = await request.post('/users').send({
			name: 'Miguel Rios',
			age: 28,
			email: 'miguelriosoliveira@gmail.com',
			password: '123456',
			address: 'Av. Paulista 1000 - São Paulo/SP',
		});

		expect(response.status).toBe(200);
		expect(response.body.name).toEqual('Miguel Rios');
		expect(response.body.age).toEqual(28);
		expect(response.body.email).toEqual('miguelriosoliveira@gmail.com');
		expect(response.body.address).toEqual('Av. Paulista 1000 - São Paulo/SP');

		done();
	});

	it('updates an user', async done => {
		const user = await User.create({
			name: 'Miguel Rios',
			age: 28,
			email: 'miguelriosoliveira@gmail.com',
			password: await hash('123456', 8),
			address: 'Av. Paulista 1000 - São Paulo/SP',
		});

		const response = await request.put(`/users/${user.id}`).send({
			name: 'Bruce Wayne',
			age: 29,
			email: 'batman@lja.com',
			address: 'Justice League HQ',
		});

		expect(response.status).toBe(200);
		expect(response.body.name).toEqual('Bruce Wayne');
		expect(response.body.age).toEqual(29);
		expect(response.body.email).toEqual('batman@lja.com');
		expect(response.body.address).toEqual('Justice League HQ');

		done();
	});

	it('deletes an user', async done => {
		const user = await User.create({
			name: 'Miguel Rios',
			age: 28,
			email: 'miguelriosoliveira@gmail.com',
			password: await hash('123456', 8),
			address: 'Av. Paulista 1000 - São Paulo/SP',
		});

		const response = await request.delete(`/users/${user.id}`);

		expect(response.status).toBe(204);
		expect(await User.findById(user.id)).toBe(null);

		done();
	});
});
