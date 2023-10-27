import { useGetAirdrop } from '@/async_fns/wagmiHooks';
import { AddTokenToWallet, AddTokenToWalletLoading } from '@/components/Button/AddTokenToWallet';
import AirdropCard from '@/components/Cards/AirdropCard/AirdropCard';
import AirdropInfo from '@/components/Info/AirdropInfo';
import Logo from '@/components/Logo';
import LayoutAndNavbar from '@/components/Pages/LayoutAndNavbar';
import { FadeTransition } from '@/components/Pages/PageTransitions';
import { supabase } from '@/config/supabaseConfig';
import { CombinedAirdrop, SupabaseReturnType } from '@/types/pandasiaTypes';
import { format } from 'date-fns';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Guidelines(props: { supabaseId: number }) {
  const { supabaseId } = props;
  const [supabaseAirdrop, setSupabaseAirdrop] = useState<SupabaseReturnType>();
  const [combinedAirdrop, setCombinedAirdrop] = useState<CombinedAirdrop>();
  const [contractId, setContractId] = useState<number>();
  const [claimCount, setClaimCount] = useState<number>(0);

  // okay great now I got some data. I want to use this to get the airdrop info and combine it for just that one airdrop.
  const { data: airdrop } = useGetAirdrop(BigInt(contractId || 0));

  useEffect(() => {
    getSupabaseAirdrop(supabaseId);
  }, [supabaseId]);

  useEffect(() => {
    if (!airdrop) {
      console.warn('no airdrop');
      return;
    }
    if (!supabaseAirdrop) {
      console.warn('no supabasea airdrop');
      return;
    }
    const ca: CombinedAirdrop = {
      id: supabaseAirdrop.id,
      contractId: airdrop.id,
      owner: airdrop.owner,
      erc20: airdrop.erc20,
      claimAmount: airdrop.claimAmount,
      root: airdrop.root,
      startsAt: airdrop.startsAt,
      expiresAt: airdrop.expiresAt,
      onlyRegistered: airdrop.onlyRegistered,
      balance: airdrop.balance,
      companyName: supabaseAirdrop.company_name,
      summary: supabaseAirdrop.summary,
      description: supabaseAirdrop.description,
      url: supabaseAirdrop.url,
      logo: supabaseAirdrop.logo,
      //@ts-ignore renamed the field from count to claims but ts somehow doesn't know
      claimCount: supabaseAirdrop.claim_count.claims,
    };
    setCombinedAirdrop(ca);
  }, [airdrop, supabaseAirdrop]);

  async function getSupabaseAirdrop(id: number) {
    const query = await supabase
      .from('airdrop_info')
      .select(
        `
        *,
        claim_count(
          claims
        ),
        airdrop_to_contract(
          contract_id
        )
        `,
      )
      .eq(`id`, id)
      .limit(1)
      .single();

    if (!query.data) {
      console.warn('no data');
      return;
    }

    //@ts-ignore
    const airdrop: SupabaseReturnType = query.data;
    setSupabaseAirdrop(airdrop);
    //@ts-ignore renamed the field from count to claims but ts somehow doesn't know
    setClaimCount(airdrop.claim_count.claims);
    setContractId(airdrop.airdrop_to_contract.contract_id);
  }

  // TODO Make this loading page better, a transition? a skeleton?
  const reggy = /http/;

  return (
    <FadeTransition>
      <LayoutAndNavbar>
        {!combinedAirdrop ? null : (
          <div className="my-12 grid w-full grid-cols-5">
            <div className="col-span-2 border-r border-secondary-700">
              <div className="flex max-w-[370px] flex-col pr-4">
                <div className="flex overflow-hidden h-24 w-24 items-center justify-center rounded-full border border-secondary-700 bg-secondary-900">
                  <Logo
                    size={75}
                    logo={combinedAirdrop.logo}
                    erc20Address={combinedAirdrop.erc20}
                  />
                </div>
                <span className="flex pt-2 text-2xl font-semibold tracking-[4px]">
                  {combinedAirdrop.companyName}
                </span>
                <span className="text-md flex font-semibold tracking-[4px] text-secondary-700 break-all">
                  {combinedAirdrop.summary}
                </span>
                {combinedAirdrop?.erc20 ? (
                  <AddTokenToWallet erc20={combinedAirdrop.erc20} />
                ) : (
                  <AddTokenToWalletLoading />
                )}
                <hr className="h-[1px] w-full border-none bg-secondary-700"></hr>
                <span className="flex pb-12 pt-4 break-all">{combinedAirdrop.description}</span>
              </div>
            </div>

            <div className="col-span-3 flex flex-col items-end pl-4">
              <div className="flex w-full max-w-[560px] flex-col">
                <AirdropCard
                  cardInfo={combinedAirdrop}
                  claimCount={claimCount}
                  setClaimCount={setClaimCount}
                  showGuidelines={false}
                />
                <span className="flex pt-8 font-semibold tracking-[4px] text-secondary-700">
                  SUMMARY
                </span>
                <span className="flex pt-2 break-all">{combinedAirdrop.summary}</span>
                <span className="flex pt-8 font-semibold tracking-[4px] text-secondary-700">
                  AIRDROP INFO
                </span>
                <AirdropInfo
                  title="Project website"
                  info={
                    <Link
                      target="_blank"
                      className="hover:underline"
                      href={reggy.test(combinedAirdrop.url) ? combinedAirdrop.url : '/not-found'}
                    >
                      {combinedAirdrop.url}
                    </Link>
                  }
                  color="text-primary-600"
                />
                <AirdropInfo title="Number of Claims" info={claimCount.toString()} />
                <AirdropInfo
                  title="ERC20 Address"
                  info={combinedAirdrop.erc20}
                  color="text-primary-600"
                  isHash
                />
                <AirdropInfo
                  title="Airdrop Start Date"
                  info={format(new Date(Date.now()), 'MM/dd/yyyy')}
                />
              </div>
            </div>
          </div>
        )}
      </LayoutAndNavbar>
    </FadeTransition>
  );
}

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = ({ params }) => {
  return {
    props: {
      supabaseId: params?.slug,
    },
  };
};
