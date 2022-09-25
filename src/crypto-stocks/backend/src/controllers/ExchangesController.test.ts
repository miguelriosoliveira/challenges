import supertest from 'supertest';
import { app } from '../app';
import { ExchangesService } from '../services';

const request = supertest(app);

describe('ExchangeController', () => {
  describe('#routing', () => {
    it('should calculate the cheapest value between binance and coinbase', async () => {
      // Arrange
      const spy = jest
        .spyOn(ExchangesService, 'routing')
        .mockResolvedValueOnce({ usdAmount: 123.456, exchange: 'fakexchange' });

      // Act
      const response = await request.get('/exchange-routing').query({ amount: 1.78 });

      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual({
        btcAmount: 1.78,
        usdAmount: 123.456,
        exchange: 'fakexchange',
      });
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(1.78);
    });
  });
});
