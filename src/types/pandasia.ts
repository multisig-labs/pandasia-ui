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
