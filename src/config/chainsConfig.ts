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

export const avalanche = {
  id: 43114,
  name: 'Avalanche',
  network: 'avalanche',
  iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/200x200/5805.png',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'Avalanche',
    symbol: 'AVAX',
  },
  rpcUrls: {
    default: {
      http: [
        'https://avalanche-mainnet.core.chainstack.com/ext/bc/C/rpc/03f8f5500afdf5ec22202f4bb231a72b',
      ],
    },
    public: {
      http: [
        'https://avalanche-mainnet.core.chainstack.com/ext/bc/C/rpc/03f8f5500afdf5ec22202f4bb231a72b',
      ],
    },
  },
  blockExplorers: {
    default: { name: 'SnowTrace', url: 'https://snowtrace.io' },
    etherscan: { name: 'SnowTrace', url: 'https://snowtrace.io' },
  },
  testnet: false,
};
