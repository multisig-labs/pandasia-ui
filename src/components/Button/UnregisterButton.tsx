import Pandasia from '@/contracts/Pandasia';
import { walletClient, publicClient } from '@/config/viem';

export default function UnregisterButton() {
  async function unregister() {
    try {
      //@ts-ignore -- the ethereum property is not on the default window object, added by wallet extensions.
      const [address] = await window.ethereum.request({ method: 'eth_requestAccounts' });

      const { request } = await publicClient.simulateContract({
        account: address,
        address: '0xfD6e7c1b6A8862C9ee2dC338bd11A3FC3c616E34',
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
