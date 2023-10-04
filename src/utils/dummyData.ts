import { CardContractInfo, CardSupabaseInfo } from '@/components/Cards/AirdropCard/AirdropCard';

export const ggpDummyContract: CardContractInfo = {
  expiresAt: Date.now(),
  tokenAmt: 4_000_000n,
  claimAmt: 50_000n,
};

export const ggpDummySupa: CardSupabaseInfo = {
  logo: 'somelogo.com',
  companyName: 'GoGoPool',
  airdropDate: Date.now(),
};
