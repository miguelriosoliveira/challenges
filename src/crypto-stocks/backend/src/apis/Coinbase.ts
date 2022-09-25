import axios from 'axios';

interface OrderBook {
  asks: [string, string][];
}

const api = axios.create({ baseURL: 'https://api.exchange.coinbase.com' });

export const coinbaseApi = {
  async getOrderBook() {
    try {
      const { data } = await api.get<OrderBook>('/products/BTC-USD/book', { params: { level: 2 } });
      return data;
    } catch (error) {
      console.error('[Coinbase] Failed getting order book', error);
      throw error;
    }
  },
};
