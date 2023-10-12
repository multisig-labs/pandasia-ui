import { useGetAirdrop } from '@/async_fns/wagmi';
import GuidelinesCard from '@/components/Cards/GuidelinesCard/GuidelinesCard';
import AirdropInfo from '@/components/Info/AirdropInfo';
import LayoutAndNavbar from '@/components/Pages/LayoutAndNavbar';
import { supabase } from '@/config/supabase';
import { CombinedAirdrop, SupabaseReturnType } from '@/types/pandasia';
import { format } from 'date-fns';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaBitcoin, FaDiscord, FaXTwitter } from 'react-icons/fa6';

export default function Guidelines(props: { someData: number }) {
  const { someData } = props;
  const [supabaseAirdrop, setSupabaseAirdrop] = useState<SupabaseReturnType>();
  const [combinedAirdrop, setCombinedAirdrop] = useState<CombinedAirdrop>();
  const [contractId, setContractId] = useState<number>();

  // okay great now I got some data. I want to use this to get the airdrop info and combine it for just that one airdrop.
  const {
    data: airdrop,
    error: airdropError,
    isLoading: airdropLoading,
    isError: airdropIsError,
  } = useGetAirdrop(BigInt(contractId || 0));

  useEffect(() => {
    getSupabaseAirdrop(someData);
  }, [someData]);

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
      expiresAt: airdrop.expires,
      onlyRegistered: airdrop.onlyRegistered,
      companyName: supabaseAirdrop.airdrop_info.company_name,
      summary: supabaseAirdrop.airdrop_info.summary,
      description: supabaseAirdrop.airdrop_info.description,
      url: supabaseAirdrop.airdrop_info.url,
      logo: supabaseAirdrop.airdrop_info.logo,
    };
    setCombinedAirdrop(ca);
  }, [airdrop, supabaseAirdrop]);

  async function getSupabaseAirdrop(id: number) {
    const query = await supabase
      .from('airdrop_to_contract')
      .select(
        `
        id, 
        contract_id,
        airdrop_info (
          company_name,
          summary,
          description,
          url,
          logo
        )
    `,
      )
      .eq(`id`, id);

    console.log('trying to match id', id);

    if (!query.data) {
      console.warn('no data');
      return;
    }

    console.log(query.data);

    if (!query.data[0]) {
      console.warn('no data in array');
      return;
    }

    //@ts-ignore
    const airdrop: SupabaseReturnType = query.data[0];
    setSupabaseAirdrop(airdrop);
    setContractId(airdrop.contract_id);
  }

  console.log('combined airdrop', combinedAirdrop);
  if (!combinedAirdrop) {
    return <div>Loading</div>;
  }

  return (
    <LayoutAndNavbar>
      <div className="my-12 grid w-full grid-cols-5">
        <div className="col-span-2 border-r border-secondary-700">
          <div className="flex max-w-[370px] flex-col pr-4">
            <div className="flex h-24 w-24 items-center justify-center rounded-full border border-secondary-700 bg-secondary-900">
              <FaBitcoin size={58} />
            </div>
            <span className="flex pt-2 text-2xl font-semibold tracking-[4px]">GOGOPOOL</span>
            <span className="text-md flex font-semibold tracking-[4px] text-secondary-700">
              SUBNETS MADE EASY
            </span>
            {/* Maybe do this later, can't dynamically add tokens to a wallet
            <div className="flex py-8">
              <button className="basis-[224px] border border-primary-600 bg-secondary-900 p-2 py-3 text-xs font-semibold tracking-[4px] text-primary-600">
                ADD GGP TO WALLET
              </button>
            </div>
            */}
            <hr className="h-[1px] w-full border-none bg-secondary-700"></hr>
            <span className="flex pb-12 pt-4">
              GoGoPool is a permissionless staking protocol designed to create widespread adoption
              for Subnets. Through its unique GGP token and liquid staking features, node operators
              can earn staking rewards in 3 ways, and can easily launch new validators for only 1000
              AVAX.
            </span>
            <span className="text-md flex pb-2 font-semibold tracking-[4px]">SOCIALS</span>
            <hr className="h-[1px] w-full border-none bg-secondary-700"></hr>
            <div className="flex gap-4 py-8 text-secondary-700">
              <Link
                className="hover-glow-secondary flex basis-[170px] items-center justify-center gap-2 border border-secondary-700 bg-secondary-900 p-2 text-xs font-semibold tracking-[4px]"
                href="https://twitter.com/gogopool_"
                target="_blank"
              >
                <FaXTwitter size={20} />
                FOLLOW
              </Link>
              <Link
                className="hover-glow-secondary flex basis-[170px] items-center justify-center gap-2 border border-secondary-700 bg-secondary-900 p-2 text-xs font-semibold tracking-[4px]"
                href="https://twitter.com/gogopool_"
                target="_blank"
              >
                <FaDiscord size={20} />
                ENGAGE
              </Link>
            </div>
          </div>
        </div>

        <div className="col-span-3 flex flex-col items-end pl-4">
          <div className="flex w-full max-w-[560px] flex-col">
            <GuidelinesCard cardInfo={combinedAirdrop} />
            <span className="flex pt-8 font-semibold tracking-[4px] text-secondary-700">
              SUMMARY
            </span>
            <span className="flex pt-2">
              GoGoPool is a permissionless staking protocol designed to create widespread adoption
              for Subnets. Through its unique GGP token and liquid staking features, node operators
              can earn staking rewards in 3 ways, and can easily launch new validators for only 1000
              AVAX.
            </span>
            <span className="flex pt-8 font-semibold tracking-[4px] text-secondary-700">
              AIRDROP INFO
            </span>
            <AirdropInfo
              title="Project website"
              info={combinedAirdrop.url}
              color="text-primary-600"
            />
            <AirdropInfo title="Number of Claims" info="645" />
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
    </LayoutAndNavbar>
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
      someData: params?.slug,
    },
  };
};
