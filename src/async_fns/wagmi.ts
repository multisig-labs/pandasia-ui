import Pandasia from '@/contracts/Pandasia';
import { HexString } from '@/types/cryptoGenerics';
import { useContractRead } from 'wagmi';

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
    //@ts-ignore
    functionName: 'getAirdrops',
    args: [offset, limit],
    watch: true,
  });
};
