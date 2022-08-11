/* eslint-disable no-underscore-dangle */
import { NextApiRequest, NextApiResponse } from 'next';
import { createMocks } from 'node-mocks-http';

import analyseApiRoute from '../../../src/pages/api/analyse';

describe('POST /analyse', () => {
	it('should return an analysed phone number alongside its message', async () => {
		const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
			method: 'POST',
			body: {
				phone: '14373293504',
				message: 'Hello world',
			},
		});

		analyseApiRoute(req, res);

		expect(res._getStatusCode()).toBe(200);
		expect(res._getJSONData()).toStrictEqual({
			prefix: 1_437_329,
			operator: 'Lucky Mobileeeeeeeee',
			region: 'Ontario',
			country: 'Canada',
			body: 'Hello world',
		});
	});
});
