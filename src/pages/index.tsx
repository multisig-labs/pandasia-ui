import Button from '@/components/ui/Button/Button';
import { CustomConnectButton } from '@/components/ui/Button/CustomConnectButton';
import UnregisterButton from '@/components/ui/Button/UnregisterButton';
import Pandasia from '@/contracts/Pandasia';
import { HexString } from '@/types/cryptoGenerics';
import Link from 'next/link';
import { useAccount, useContractRead } from 'wagmi';

export default function Home() {
  const { address: account } = useAccount();
  const { data: accountAddr } = useContractRead({
    address: '0xfD6e7c1b6A8862C9ee2dC338bd11A3FC3c616E34',
    abi: Pandasia,
    functionName: 'c2p',
    args: [account as HexString],
    watch: true,
  });

  return (
    <main className={`flex flex-col p-12 justify-center min-h-screen bg-secondary-800`}>
      <div className="flex flex-col w-full gap-2">
        <span className="text-4xl text-primary-300">PANDASIA</span>
        <div className="flex font-semibold justify-between text-primary-300 items-center border-b border-black">
          <span className="text-2xl tracking-wide">CONNECT</span>
        </div>
        <CustomConnectButton />
        <span className="text-primary-300">
          Connect wallet to begin. If you have already registered, Welcome to Pandasia.
        </span>

        {accountAddr && parseInt(accountAddr, 16) !== 0 ? (
          <>
            <Link href={'/pandasia'}>
              <Button>Enter Pandasia</Button>
            </Link>
            <UnregisterButton />
          </>
        ) : (
          <Link href={'/register'}>
            <Button>Register</Button>
          </Link>
        )}
      </div>
    </main>
  );
}
