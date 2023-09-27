import Button from '@/components/Button/Button';
import { CustomConnectButton } from '@/components/Button/CustomConnectButton';
import UnregisterButton from '@/components/Button/UnregisterButton';
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
    <main className={`flex min-h-screen flex-col justify-center bg-secondary-800 p-12`}>
      <div className="flex w-full flex-col gap-2">
        <span className="text-4xl text-primary-300">PANDASIA</span>
        <div className="flex items-center justify-between border-b border-black font-semibold text-primary-300">
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
