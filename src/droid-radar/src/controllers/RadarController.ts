import { Request, Response } from 'express';

import { RadarReading } from '../@types';
import { StrikeService } from '../services';

export function radar(request: Request, response: Response) {
	const scan = request.body as RadarReading;
	const { x, y } = StrikeService.findStrikePoint(scan);
	response.json({ x, y });
}
