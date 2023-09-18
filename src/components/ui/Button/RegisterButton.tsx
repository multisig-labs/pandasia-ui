import Pandasia from '@/contracts/Pandasia';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import Button from './Button';
import { TreeData } from '@/types/pandasia';

type Props = {
  treeData: TreeData;
};

export default function RegisterButton({ treeData }: Props) {
  const { config: registerConfig } = usePrepareContractWrite({
    address: '0xfD6e7c1b6A8862C9ee2dC338bd11A3FC3c616E34',
    abi: Pandasia,
    functionName: 'registerPChainAddr',
    args: [parseInt(treeData.SigV, 16), treeData.SigR, treeData.SigS, treeData.Proof],
  });

  const { write: registerAddress } = useContractWrite({
    ...registerConfig,
    onSuccess(data) {
      console.log('SUCESESSS', data);
    },
    onError(error) {
      console.log('ERRORRRRRRRRRR NO', error);
    },
  });

  async function register() {
    console.log('do it', registerAddress);
    if (registerAddress) {
      try {
        registerAddress();
      } catch (err) {
        console.warn(err);
      }
    }
  }
  return <Button onClick={register}>Register Address</Button>;
}
