import { useGetTokenName } from '@/async_fns/wagmi';
import { HexString } from '@/types/cryptoGenerics';
import addToken from '@/utils/addToken';

type Props = {
  erc20: HexString;
};

export function AddTokenToWallet({ erc20 }: Props) {
  const {
    data: tokenName,
    isLoading: tokenNameIsLoading,
    isError: tokenNameIsError,
  } = useGetTokenName(erc20);

  function handleAddToken(tokenName: string) {
    addToken(erc20, tokenName);
  }

  if (!tokenName) {
    return (
      <div className="flex py-8">
        <button className="basis-[224px] border border-primary-600 bg-secondary-900 p-2 py-3 text-xs font-semibold tracking-[4px] text-primary-600">
          {tokenNameIsLoading && `LOADING`}
          {tokenNameIsError && `UNABLE TO ADD TOKEN`}
        </button>
      </div>
    );
  }

  return (
    <div className="flex py-8">
      <button
        onClick={() => handleAddToken(tokenName)}
        className="basis-[224px] border border-primary-600 bg-secondary-900 p-2 py-3 text-xs font-semibold tracking-[4px] text-primary-600"
      >
        ADD TOKEN TO WALLET
      </button>
    </div>
  );
}

export function AddTokenToWalletLoading() {
  return (
    <div className="flex py-8">
      <button className="basis-[224px] border border-primary-600 bg-secondary-900 p-2 py-3 text-xs font-semibold tracking-[4px] text-primary-600">
        LOADING
      </button>
    </div>
  );
}
