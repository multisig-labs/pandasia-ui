import { HexString } from '@/types/cryptoGenerics';

const addToken = async (address: HexString, symbol: string, decimals = 18): Promise<boolean> => {
  //@ts-ignore it can't find ethereum on window
  if (window.ethereum === undefined) {
    return false;
  }

  try {
    //@ts-ignore it can't find ethereum on window
    await window?.ethereum?.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address,
          symbol: symbol,
          decimals: decimals,
        },
      },
    });
  } catch (e: unknown) {
    console.error(e);
    return false;
  }

  return true;
};

export default addToken;
