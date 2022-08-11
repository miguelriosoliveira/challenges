import type { NextApiRequest, NextApiResponse } from 'next';

import { urlify } from '../../utils';

import { matchPhone } from './_matchPhone';

interface Response {
	prefix: number;
	operator: string | null;
	country: string;
	region: string | null;
	body: string;
}

interface ErrorResponse {
	error: string;
}

export default function handler(
	request: NextApiRequest,
	response: NextApiResponse<Response | ErrorResponse>,
) {
	const { phone, message } = request.body;

	try {
		const { prefix, operator, country, region } = matchPhone(phone);
		const messageWithLinks = urlify(message);
		response.status(200).json({
			prefix,
			operator,
			country,
			region,
			body: messageWithLinks,
		});
	} catch (error) {
		const { message: errorMessage } = error as Error;
		response.status(404).json({ error: errorMessage });
	}
}
