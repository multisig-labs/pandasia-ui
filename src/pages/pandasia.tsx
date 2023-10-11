import AirdropCard from '@/components/Cards/AirdropCard/AirdropCard';
import LayoutAndNavbar from '@/components/Pages/LayoutAndNavbar';
import NotAuthorized from '@/components/Pages/NotAuthorized/NotAuthorized';
import { useC2PAuth } from '@/hooks/useC2PAuth';
import { ggpDummyContract, ggpDummySupa } from '@/utils/dummyData';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Pandasia() {
  const [isClient, setIsClient] = useState(false);
  const { authAddr } = useC2PAuth();

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient && (
        <LayoutAndNavbar>
          {!authAddr || parseInt(authAddr, 16) === 0 ? (
            <NotAuthorized />
          ) : (
            <div className="flex w-full flex-col items-center">
              <Image
                className="pt-11"
                src={'/claim-airdrop.svg'}
                alt="Claim Airdrop"
                width={574}
                height={103}
              />
              <div className="flex w-[500px] flex-col border-b border-b-primary-900 py-4 text-center">
                <span className="text-2xl font-bold tracking-[4px]">CLAIM AIRDROP REWARDS</span>
                <span className="text-primary-600">
                  These are the airdrops you are eligible to claim.
                </span>
              </div>
              <div className="grid grid-cols-1 justify-center gap-8 p-8 md:grid-cols-2">
                <AirdropCard cardContractInfo={ggpDummyContract} cardSupabaseInfo={ggpDummySupa} />
                <AirdropCard cardContractInfo={ggpDummyContract} cardSupabaseInfo={ggpDummySupa} />
                <AirdropCard cardContractInfo={ggpDummyContract} cardSupabaseInfo={ggpDummySupa} />
              </div>
            </div>
          )}
        </LayoutAndNavbar>
      )}
    </>
  );
}
