export const anvil = {
  id: 31337,
  name: 'anvil',
  network: 'anvil',
  nativeCurrency: {
    decimals: 18,
    name: 'AVAX',
    symbol: 'AVAX',
  },
  rpcUrls: {
    public: { http: ['http://localhost:9650'] },
    default: { http: ['http://localhost:9650'] },
  },
  blockExplorers: {
    default: { name: 'Blockscout', url: 'https://todo.com' },
  },
  testnet: true,
};
