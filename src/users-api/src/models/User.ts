import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
	name: string;
	age: number;
	email: string;
	password: string;
	address: string;
}

const UserSchema = new Schema(
	{
		name: { type: String, required: true },
		age: { type: Number, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		address: { type: String, required: true },
	},
	{ versionKey: false },
);

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
