import type { AddressInfo } from 'node:net';

import celebrate from 'celebrate';
import express from 'express';
import morgan from 'morgan';

import { router } from './router';

const server = express();
server.disable('x-powered-by');
server.use(morgan('dev'));
server.use(express.json());
server.use(router);
server.use(celebrate.errors());

const PORT = 8888;
const listener = server.listen(PORT, () => {
	const { address, port } = listener.address() as AddressInfo;
	const addressFixed = address === '::' ? 'localhost' : address;
	console.log(`🚀 Server running on http://${addressFixed}:${port}`);
});
