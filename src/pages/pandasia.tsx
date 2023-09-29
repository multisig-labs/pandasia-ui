import LayoutAndNavbar from '@/components/Pages/LayoutAndNavbar';
import Image from 'next/image';

export default function Pandasia() {
  return (
    <LayoutAndNavbar>
      <Image
        className="pt-11"
        src={'/claim-airdrop.svg'}
        alt="Claim Airdrop"
        width={574}
        height={103}
      />
      <div className="flex w-[500px] flex-col border-b border-b-primary-900 py-4 text-center">
        <span className="text-2xl font-bold tracking-[4px]">CLAIM AIRDROP REWARDS</span>
        <span className="text-primary-600">These are the airdrops you are eligible to claim.</span>
      </div>
    </LayoutAndNavbar>
  );
}
