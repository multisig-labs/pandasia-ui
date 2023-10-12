import { CombinedAirdrop } from '@/types/pandasia';

export const ggpDummyContract: CombinedAirdrop = {
  expiresAt: Date.now(),
  // tokenAmt: 4_000_000n,
  claimAmount: 50_000n,
  logo: 'somelogo.com',
  companyName: 'GoGoPool',
  id: 0,
  contractId: 10n,
  owner: '0x424328bf10cdaeeda6bb05a78cff90a0bea12c02',
  erc20: '0x424328bf10cdaeeda6bb05a78cff90a0bea12c02',
  root: '0x424328bf10cdaeeda6bb05a78cff90a0bea12c02',
  onlyRegistered: true,

  summary: 'burgers',
  description: 'makin burgers',
  url: 'burgers.com',
};
