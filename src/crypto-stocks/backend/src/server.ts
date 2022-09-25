import { AddressInfo } from 'net';
import { app } from './app';

const PORT = 4000;
const listener = app.listen(PORT, () => {
  const { address, port } = listener.address() as AddressInfo;
  const addressFixed = address === '::' ? 'localhost' : address;
  console.log(`🚀 Server running on http://${addressFixed}:${port}`);
});
