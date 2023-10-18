import { publicClient } from '@/config/viem';
import Pandasia from '@/contracts/Pandasia';
import { HexString } from '@/types/cryptoGenerics';
import { Proof } from '@/types/pandasia';

export async function verify(proof: Proof) {
  const verify = await publicClient.readContract({
    address: '0xfD6e7c1b6A8862C9ee2dC338bd11A3FC3c616E34',
    abi: Pandasia,
    functionName: 'verify',
    args: [proof.Root, '0x424328bf10cdaeeda6bb05a78cff90a0bea12c02', proof.Proof],
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
    address: '0xfD6e7c1b6A8862C9ee2dC338bd11A3FC3c616E34',
    abi: Pandasia,
    functionName: 'newAirdrop',
    args: [proof, onlyRegistered, erc20, claimAmount, startsAt, expiresAt],
  });

  return newAirdrop;
}

export async function recoverMessage(sig: Proof, address: HexString) {
  // Recovers the pChain address from the signature
  const pAddr = await publicClient.readContract({
    account: address,
    address: '0xfD6e7c1b6A8862C9ee2dC338bd11A3FC3c616E34',
    abi: Pandasia,
    functionName: 'recoverMessage',
    args: [parseInt(sig.SigV, 16), sig.SigR, sig.SigS],
  });
  return pAddr;
}

export async function registerPChainAdrr(proof: Proof, address: HexString) {
  const { request: register } = await publicClient.simulateContract({
    account: address,
    address: '0xfD6e7c1b6A8862C9ee2dC338bd11A3FC3c616E34',
    abi: Pandasia,
    functionName: 'registerPChainAddr',
    args: [parseInt(proof.SigV, 16), proof.SigR, proof.SigS, proof.Proof],
  });

  return register;
}

export async function getAirdropIds(address: HexString) {
  const ids = await publicClient.readContract({
    account: address,
    address: '0xfD6e7c1b6A8862C9ee2dC338bd11A3FC3c616E34',
    abi: Pandasia,
    functionName: 'getAirdropIds',
    args: [address],
  });
  return ids;
}
