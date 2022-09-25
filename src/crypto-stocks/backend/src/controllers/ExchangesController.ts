import { Request, Response } from 'express';
import { ExchangesService } from '../services';

interface RequestQuery {
  amount: number;
}

export async function routing(
  request: Request<null, null, null, RequestQuery>,
  response: Response,
) {
  const { amount: btcAmount } = request.query;
  const { usdAmount, exchange } = await ExchangesService.routing(btcAmount);
  response.json({ btcAmount, usdAmount, exchange });
}
