import { publicClient, walletClient } from '@/config/viemConfig';
import Pandasia from '@/contracts/PandasiaContract';
import { HexString } from '@/types/cryptoGenerics';

export default function UnregisterButton() {
  async function unregister() {
    try {
      //@ts-ignore -- the ethereum property is not on the default window object, added by wallet extensions.
      const [address] = await window.ethereum.request({ method: 'eth_requestAccounts' });

      const { request } = await publicClient.simulateContract({
        account: address,
        address: process.env.PANDASIA_ADDR as HexString,
        abi: Pandasia,
        functionName: 'unregisterPChainAddr',
      });
      const txHash = await walletClient.writeContract(request);
    } catch (err) {
      console.warn(err);
    }
  }
  return (
    <button onClick={unregister} className="tracking-[4px] text-primary-500">
      UNREGISTER
    </button>
  );
}
