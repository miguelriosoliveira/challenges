/* eslint-disable no-console */

import 'dotenv/config';
import { hash } from 'bcrypt';
import mongoose from 'mongoose';

import User from '../models/User';

async function seedScript(): Promise<void> {
	try {
		await mongoose.connect(process.env.MONGO_URL as string, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		});

		await User.deleteMany({});
		console.log('All Users deleted!');

		await User.create({
			name: 'Miguel Rios',
			age: 28,
			email: 'miguelriosoliveira@gmail.com',
			password: await hash('123456', 8),
			address: 'Av. Paulista 1000 - São Paulo/SP',
		});
	} catch (error) {
		console.error('=== BAD ===');
		console.error(error);
	}

	console.log('Seed users created!');
	process.exit();
}

seedScript();
