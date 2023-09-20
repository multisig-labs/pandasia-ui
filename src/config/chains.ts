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

export const forky = {
  id: 43114,
  name: 'anvil-fork',
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
