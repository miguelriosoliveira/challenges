import axios from 'axios';

interface OrderBook {
  asks: [string, string][];
}

const api = axios.create({ baseURL: 'https://api.binance.com' });

export const binanceApi = {
  async getOrderBook() {
    try {
      const { data } = await api.get<OrderBook>('/api/v3/depth', {
        params: { symbol: 'BTCUSDT', limit: 5000 },
      });
      return data;
    } catch (error) {
      console.error('[Binance] Failed getting order book', error);
      throw error;
    }
  },
};
