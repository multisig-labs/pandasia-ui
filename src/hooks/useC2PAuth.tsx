import Pandasia from '@/contracts/Pandasia';
import { HexString } from '@/types/cryptoGenerics';
import { useAccount, useContractRead } from 'wagmi';

export function useC2PAuth() {
  const { address: account } = useAccount();
  const { data: pChainAddr } = useContractRead({
    address: '0xfD6e7c1b6A8862C9ee2dC338bd11A3FC3c616E34',
    abi: Pandasia,
    functionName: 'c2p',
    args: [account as HexString],
    watch: true,
  });
  return { account, pChainAddr };
}
