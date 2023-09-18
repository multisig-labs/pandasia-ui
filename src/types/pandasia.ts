import { HexString } from './cryptoGenerics';

export type TreeData = {
  Height: number;
  Proof: HexString[];
  Root: HexString;
  SigR: HexString;
  SigS: HexString;
  SigV: HexString;
  TreeType: string;
};

export type ContractErrors = 'PAddrAlreadyRegistered()';
