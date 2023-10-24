import ERC20 from '@/contracts/ERC20';
import Pandasia from '@/contracts/PandasiaContract';
import { HexString } from '@/types/cryptoGenerics';
import { useContractRead, usePrepareContractWrite } from 'wagmi';

export const useGetAirdropIds = (address: HexString) => {
  return useContractRead({
    address: '0xfD6e7c1b6A8862C9ee2dC338bd11A3FC3c616E34',
    abi: Pandasia,
    functionName: 'getAirdropIds',
    args: [address],
    watch: true,
  });
};

export const useGetAirdrop = (id: bigint) => {
  return useContractRead({
    address: '0xfD6e7c1b6A8862C9ee2dC338bd11A3FC3c616E34',
    abi: Pandasia,
    functionName: 'getAirdrop',
    args: [id],
    watch: true,
  });
};

export const useGetAirdrops = (offset: bigint, limit: bigint) => {
  return useContractRead({
    address: '0xfD6e7c1b6A8862C9ee2dC338bd11A3FC3c616E34',
    abi: Pandasia,
    //@ts-ignore - not sure why typescript can't find this... it is present in the contract, and this hook works
    functionName: 'getAirdrops',
    args: [offset, limit],
    watch: true,
  });
};

export const useClaimAirdrop = (id: bigint, proof: HexString[]) => {
  return usePrepareContractWrite({
    address: '0xfD6e7c1b6A8862C9ee2dC338bd11A3FC3c616E34',
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
