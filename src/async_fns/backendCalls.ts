import { HexString } from '@/types/cryptoGenerics';
import { Proof, Trees } from '@/types/pandasiaTypes';
import axios from 'axios';

export async function getProof(rootHash: string, pChain: string | HexString, signature: string) {
  const res = await axios.get<Proof>(
    `${process.env.NEXT_PUBLIC_PANDASIA_SERVER}/proof/${rootHash}?addr=${pChain}&sig=${signature}`,
  );
  return res;
}

export async function updateClickCount(supabaseId: number, claimCount: number) {
  const res = await axios.post(`/api/click_count`, { id: supabaseId, claimCount: claimCount });
  return res;
}

export async function getSig(signature: string) {
  const res = await axios.get<Proof>(
    `${process.env.NEXT_PUBLIC_PANDASIA_SERVER}/signature/${signature}`,
  );
  return res;
}

export async function getTreeData() {
  const { data: trees } = await axios.get<Trees>(
    `${process.env.NEXT_PUBLIC_PANDASIA_SERVER}/trees`,
  );
  return trees;
}

export async function verifyPChain(merkleRoot: HexString, pChainAddr: string) {
  return await axios.get(
    `${process.env.NEXT_PUBLIC_PANDASIA_SERVER}/check_pchain_addr/${merkleRoot}?addr=${pChainAddr}`,
  );
}

export async function nodeIdDetails(nodeId: string) {
  return await axios.get(
    `https://glacier-api.avax.network/v1/networks/mainnet/validators/${nodeId}?pageSize=10&sortOrder=asc&validationStatus=active`,
  );
}
