import ERC20 from '@/contracts/ERC20';
import Pandasia from '@/contracts/PandasiaContract';
import { HexString } from '@/types/cryptoGenerics';
import { useAccount, useContractRead, usePrepareContractWrite } from 'wagmi';

export const useGetAirdropIds = (address: HexString) => {
  return useContractRead({
    address: process.env.NEXT_PUBLIC_PANDASIA_ADDRESS as HexString,
    abi: Pandasia,
    functionName: 'getAirdropIds',
    args: [address],
    watch: true,
  });
};

export const useGetAirdrop = (id: bigint) => {
  return useContractRead({
    address: process.env.NEXT_PUBLIC_PANDASIA_ADDRESS as HexString,
    abi: Pandasia,
    functionName: 'getAirdrop',
    args: [id],
    watch: true,
  });
};

export const useGetAirdrops = (offset: bigint, limit: bigint) => {
  return useContractRead({
    address: process.env.NEXT_PUBLIC_PANDASIA_ADDRESS as HexString,
    abi: Pandasia,
    //@ts-ignore - not sure why typescript can't find this... it is present in the contract, and this hook works
    functionName: 'getAirdrops',
    args: [offset, limit],
    watch: true,
  });
};

export const useClaimAirdrop = (id: bigint, proof: HexString[]) => {
  return usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_PANDASIA_ADDRESS as HexString,
    abi: Pandasia,
    functionName: 'claimAirdrop',
    args: [id, proof],
  });
};

export const useCanClaimAirdrop = (id: bigint, proof: HexString[]) => {
  const { address: account } = useAccount();
  return useContractRead({
    address: process.env.NEXT_PUBLIC_PANDASIA_ADDRESS as HexString,
    abi: Pandasia,
    functionName: 'canClaimAirdrop',
    args: [account as HexString, id, proof],
  });
};

export const useGetTokenName = (tokenAddress: HexString) => {
  return useContractRead({
    address: tokenAddress,
    abi: ERC20,
    functionName: 'name',
  });
};

export const useGetTokenSymbol = (tokenAddress: HexString) => {
  return useContractRead({
    address: tokenAddress,
    abi: ERC20,
    functionName: 'symbol',
  });
};

export const useGetTokenBalance = (tokenAddress: HexString, address: HexString) => {
  return useContractRead({
    address: tokenAddress,
    abi: ERC20,
    functionName: 'balanceOf',
    args: [address],
  });
};

export function useC2PAuth() {
  const { address: account } = useAccount();
  const { data: pChainAddr } = useContractRead({
    address: process.env.NEXT_PUBLIC_PANDASIA_ADDRESS as HexString,
    abi: Pandasia,
    functionName: 'c2p',
    args: [account as HexString],
    watch: true,
  });
  return { account, pChainAddr };
}

export function useIsMinipoolOperator() {
  const { address: account } = useAccount();
  const { data: isOperator } = useContractRead({
    address: process.env.NEXT_PUBLIC_PANDASIA_ADDRESS as HexString,
    abi: Pandasia,
    functionName: 'isMinipoolOperator',
    args: [account as HexString],
    watch: true,
  });
  return { isOperator };
}

export function useGetMerkleRoot() {
  return useContractRead({
    address: process.env.NEXT_PUBLIC_PANDASIA_ADDRESS as HexString,
    abi: Pandasia,
    functionName: 'merkleRoot',
    watch: true,
  });
}
