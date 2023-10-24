import { HexString } from '@/types/cryptoGenerics';
import { Proof, Trees } from '@/types/pandasiaTypes';
import { PANDASIA_SERVER } from '@/utils/consts';
import axios from 'axios';

export async function getProof(rootHash: string, pChain: string | HexString, signature: string) {
  const res = await axios.get<Proof>(
    `${PANDASIA_SERVER}/proof/${rootHash}?addr=${pChain}&sig=${signature}`,
  );
  return res;
}

export async function updateClickCount(supabaseId: number, claimCount: number) {
  const res = await axios.post(`/api/click_count`, { id: supabaseId, claimCount: claimCount });
  return res;
}

export async function getSig(signature: string) {
  const res = await axios.get<Proof>(`${PANDASIA_SERVER}/signature/${signature}`);
  return res;
}

export async function getTreeData() {
  const { data: trees } = await axios.get<Trees>(`${PANDASIA_SERVER}/trees`);
  return trees;
}
