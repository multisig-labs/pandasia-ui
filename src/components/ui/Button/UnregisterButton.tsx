import Pandasia from '@/contracts/Pandasia';
import Button from './Button';
import { walletClient, publicClient } from '@/config/viem';

// Figure out how to do this with Viem
export default function UnregisterButton() {
  async function unregister() {
    try {
      console.log('starting addresses');
      const [address] = await window.ethereum.request({ method: 'eth_requestAccounts' });
      // const [address] = await walletClient.getAddresses();
      console.log('done with addresses');

      const { request } = await publicClient.simulateContract({
        account: address,
        address: '0xfD6e7c1b6A8862C9ee2dC338bd11A3FC3c616E34',
        abi: Pandasia,
        functionName: 'unregisterPChainAddr',
      });
      console.log('staring run ');
      const txHash = await walletClient.writeContract(request);
      console.log('done with run');
    } catch (err) {
      console.warn(err);
    }
  }
  return <Button onClick={unregister}>Unregister</Button>;
}
