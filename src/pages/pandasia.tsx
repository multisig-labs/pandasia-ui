import AirdropCard from '@/components/Cards/AirdropCard/AirdropCard';
import LayoutAndNavbar from '@/components/Pages/LayoutAndNavbar';
import { ggpDummyContract, ggpDummySupa } from '@/utils/dummyData';
import Image from 'next/image';

export default function Pandasia() {
  return (
    <LayoutAndNavbar>
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
    </LayoutAndNavbar>
  );
}
