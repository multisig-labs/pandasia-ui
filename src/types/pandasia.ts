import { HexString } from './cryptoGenerics';

export type Tree = {
  ID: number;
  Height: number;
  TreeType: string;
  Root: string;
  Description: string;
};

export type Trees = Tree[];

export type Proof = {
  Height: number;
  Proof: HexString[];
  Root: HexString;
  SigR: HexString;
  SigS: HexString;
  SigV: HexString;
  TreeType: string;
};

export type ContractErrors = 'PAddrAlreadyRegistered()';

export type CombinedAirdrop = {
  id: number;
  contractId: bigint;
  owner: HexString;
  erc20: HexString;
  claimAmount: bigint;
  root: HexString;
  startsAt: bigint;
  expiresAt: bigint;
  onlyRegistered: boolean;

  companyName: string;
  summary: string;
  description: string;
  url: string;
  logo: string;
};

export type SupabaseAirdrop = {
  supabaseId: number;
  companyName: string;
  summary: string;
  description: string;
  url: string;
  logo: string;
};

export type SupabaseReturnType = {
  id: number;
  contract_id: number;
  airdrop_info: {
    company_name: string;
    summary: string;
    description: string;
    url: string;
    logo: string;
  };
};
