import { HexString } from '@/types/cryptoGenerics';
import { Proof, Trees } from '@/types/pandasiaTypes';
import axios from 'axios';

export async function getProof(rootHash: string, pChain: string | HexString, signature: string) {
  const res = await axios.get<Proof>(
    `http://localhost:8000/proof/${rootHash}?addr=${pChain}&sig=${signature}`,
  );
  return res;
}

export async function updateClickCount(supabaseId: number, claimCount: number) {
  const res = await axios.post(`/api/click_count`, { id: supabaseId, claimCount: claimCount });
  return res;
}

export async function getSig(signature: string) {
  const res = await axios.get<Proof>(`http://localhost:8000/signature/${signature}`);
  return res;
}

export async function getTreeData() {
  const { data: trees } = await axios.get<Trees>('http://localhost:8000/trees');
  return trees;
}