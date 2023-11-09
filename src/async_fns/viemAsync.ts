import { publicClient } from '@/config/viemConfig';
import ERC20 from '@/contracts/ERC20';
import Pandasia from '@/contracts/PandasiaContract';
import { HexString } from '@/types/cryptoGenerics';
import { Proof } from '@/types/pandasiaTypes';

export async function verify(proof: Proof, account: HexString) {
  const verify = await publicClient.readContract({
    address: process.env.NEXT_PUBLIC_PANDASIA_ADDRESS as HexString,
    abi: Pandasia,
    functionName: 'verify',
    args: [proof.Root, account, proof.Proof],
  });
  return verify;
}

export async function newAirdrop(
  address: HexString,
  proof: HexString,
  onlyRegistered: boolean,
  erc20: HexString,
  claimAmount: bigint,
  startsAt: bigint,
  expiresAt: bigint,
) {
  const { request: newAirdrop } = await publicClient.simulateContract({
    account: address,
    address: process.env.NEXT_PUBLIC_PANDASIA_ADDRESS as HexString,
    abi: Pandasia,
    functionName: 'newAirdrop',
    args: [proof, onlyRegistered, erc20, claimAmount, startsAt, expiresAt],
  });

  return newAirdrop;
}

export async function withdrawFunds(airdropId: bigint, withdrawAmt: bigint, account: HexString) {
  const { request: withdraw } = await publicClient.simulateContract({
    account: account,
    address: process.env.NEXT_PUBLIC_PANDASIA_ADDRESS as HexString,
    abi: Pandasia,
    functionName: 'withdrawFunding',
    args: [airdropId, withdrawAmt],
  });

  return withdraw;
}

export async function fundAirdrop(airdropId: bigint, claimAmt: bigint, account: HexString) {
  const { request: fund } = await publicClient.simulateContract({
    account: account,
    address: process.env.NEXT_PUBLIC_PANDASIA_ADDRESS as HexString,
    abi: Pandasia,
    functionName: 'fundAirdrop',
    args: [airdropId, claimAmt],
  });

  return fund;
}

export async function increaseAllowance(erc20Addr: HexString, addAmt: bigint, account: HexString) {
  const { request: fund } = await publicClient.simulateContract({
    account: account,
    address: erc20Addr,
    abi: ERC20,
    functionName: 'increaseAllowance',
    args: [process.env.NEXT_PUBLIC_PANDASIA_ADDRESS as HexString, addAmt],
  });

  return fund;
}

export async function recoverMessage(sig: Proof, address: HexString) {
  // Recovers the pChain address from the signature
  const pAddr = await publicClient.readContract({
    account: address,
    address: process.env.NEXT_PUBLIC_PANDASIA_ADDRESS as HexString,
    abi: Pandasia,
    functionName: 'recoverMessage',
    args: [parseInt(sig.SigV, 16), sig.SigR, sig.SigS],
  });
  return pAddr;
}

export async function registerPChainAdrr(proof: Proof, address: HexString) {
  const { request: register } = await publicClient.simulateContract({
    account: address,
    address: process.env.NEXT_PUBLIC_PANDASIA_ADDRESS as HexString,
    abi: Pandasia,
    functionName: 'registerPChainAddr',
    args: [parseInt(proof.SigV, 16), proof.SigR, proof.SigS, proof.Proof],
  });

  return register;
}

export async function getAirdropIds(address: HexString) {
  const ids = await publicClient.readContract({
    account: address,
    address: process.env.NEXT_PUBLIC_PANDASIA_ADDRESS as HexString,
    abi: Pandasia,
    functionName: 'getAirdropIds',
    args: [address],
  });
  return ids;
}
