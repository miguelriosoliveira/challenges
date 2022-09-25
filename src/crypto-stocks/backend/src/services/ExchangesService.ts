import { binanceApi, coinbaseApi } from '../apis';

async function getBinanceCheapest() {
  const { asks: orderBook } = await binanceApi.getOrderBook();
  const unitPrices = orderBook.map(([priceStr, quantityStr]) => {
    return Number(priceStr) / Number(quantityStr);
  });
  return {
    exchange: 'binance',
    price: Math.min(...unitPrices),
  };
}

async function getCoinbaseCheapest() {
  const { asks: orderBook } = await coinbaseApi.getOrderBook();
  const unitPrices = orderBook.map(([priceStr, quantityStr]) => {
    return Number(priceStr) / Number(quantityStr);
  });
  return {
    exchange: 'coinbase',
    price: Math.min(...unitPrices),
  };
}

export async function routing(btcAmount: number) {
  const [binanceCheapest, coinbaseCheapest] = await Promise.all([
    getBinanceCheapest(),
    getCoinbaseCheapest(),
  ]);

  console.table([binanceCheapest, coinbaseCheapest]);

  const [cheapest] = [binanceCheapest, coinbaseCheapest].sort((a, b) => a.price - b.price);
  return {
    usdAmount: cheapest.price * btcAmount,
    exchange: cheapest.exchange,
  };
}
