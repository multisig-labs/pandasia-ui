import ERC20 from '@/contracts/ERC20';
import Pandasia from '@/contracts/PandasiaContract';
import { HexString } from '@/types/cryptoGenerics';
import { PANDASIA_ADDR } from '@/utils/consts';
import { useAccount, useContractRead, usePrepareContractWrite } from 'wagmi';

export const useGetAirdropIds = (address: HexString) => {
  return useContractRead({
    address: PANDASIA_ADDR,
    abi: Pandasia,
    functionName: 'getAirdropIds',
    args: [address],
    watch: true,
  });
};

export const useGetAirdrop = (id: bigint) => {
  return useContractRead({
    address: PANDASIA_ADDR,
    abi: Pandasia,
    functionName: 'getAirdrop',
    args: [id],
    watch: true,
  });
};

export const useGetAirdrops = (offset: bigint, limit: bigint) => {
  return useContractRead({
    address: PANDASIA_ADDR,
    abi: Pandasia,
    //@ts-ignore - not sure why typescript can't find this... it is present in the contract, and this hook works
    functionName: 'getAirdrops',
    args: [offset, limit],
    watch: true,
  });
};

export const useClaimAirdrop = (id: bigint, proof: HexString[]) => {
  return usePrepareContractWrite({
    address: PANDASIA_ADDR,
    abi: Pandasia,
    functionName: 'claimAirdrop',
    args: [id, proof],
  });
};

export const useGetTokenName = (tokenAddress: HexString) => {
  return useContractRead({
    address: tokenAddress,
    abi: ERC20,
    functionName: 'name',
  });
};

export function useC2PAuth() {
  const { address: account } = useAccount();
  const { data: pChainAddr } = useContractRead({
    address: PANDASIA_ADDR,
    abi: Pandasia,
    functionName: 'c2p',
    args: [account as HexString],
    watch: true,
  });
  return { account, pChainAddr };
}
