import { publicClient } from '@/config/viem';
import Pandasia from '@/contracts/Pandasia';
import { Proof, Trees } from '@/types/pandasia';
import axios from 'axios';

export async function verify(proof: Proof) {
  const verify = await publicClient.readContract({
    address: '0xfD6e7c1b6A8862C9ee2dC338bd11A3FC3c616E34',
    abi: Pandasia,
    functionName: 'verify',
    args: [proof.Root, '0x424328bf10cdaeeda6bb05a78cff90a0bea12c02', proof.Proof],
  });
  return verify;
}
