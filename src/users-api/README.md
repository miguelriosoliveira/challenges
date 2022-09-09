# Users API

Server made using [**TypeScript**](https://www.typescriptlang.org/), [**Node.js**](https://nodejs.org/), [**Express**](https://expressjs.com/), [**MongoDB Atlas**](https://www.mongodb.com/cloud/atlas) and [**mongoose**](https://mongoosejs.com/).

## Main responsibilities

This REST API provides the main functions for a CRUD of Users (with name, age, email, password and address):

- List all users.
- Display a single user.
- Creation of an user.
- Update an user.
- User can change his/her password (if he/she remembers his old password).
- Delete an user.

## How to run locally

1. Create a `.env` file based on the `.env.sample`:

	```
	cp .env.sample .env
	```

1. Fill the `MONGO_URL` variable with the connection string of your existent MongoDB:

	```ini
	PORT=3333
	MONGO_URL=mongodb://username:password@myhost/db_name?<options>
	```

1. Install dependencies and run the server!
	```
	yarn
	yarn dev
	```

1. To run tests

	```
	yarn test
	```
