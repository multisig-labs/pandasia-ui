import GuidelinesCard from '@/components/Cards/GuidelinesCard/GuidelinesCard';
import AirdropInfo from '@/components/Info/AirdropInfo';
import LayoutAndNavbar from '@/components/Pages/LayoutAndNavbar';
import { ggpDummyContract, ggpDummySupa } from '@/utils/dummyData';
import { format } from 'date-fns';
import { FaBitcoin, FaDiscord, FaXTwitter } from 'react-icons/fa6';

// @ts-ignore
export default function Guidelines(props) {
  const { someData } = props;
  console.log(someData);
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
            <div className="flex py-8">
              <button className="basis-[224px] border border-primary-600 bg-secondary-900 p-2 py-3 text-xs font-semibold tracking-[4px] text-primary-600">
                ADD GGP TO WALLET
              </button>
            </div>
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
              <button className="flex basis-[170px] items-center justify-center gap-2 border border-secondary-700 bg-secondary-900 p-2 text-xs font-semibold tracking-[4px]">
                <FaXTwitter size={20} />
                FOLLOW
              </button>
              <button className="flex basis-[170px] items-center justify-center gap-2 border border-secondary-700 bg-secondary-900 p-2 text-xs font-semibold tracking-[4px]">
                <FaDiscord size={20} />
                ENGAGE
              </button>
            </div>
          </div>
        </div>

        <div className="col-span-3 flex flex-col items-end pl-4">
          <div className="flex w-full max-w-[560px] flex-col">
            <GuidelinesCard cardContractInfo={ggpDummyContract} cardSupabaseInfo={ggpDummySupa} />
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
              info="https://gogopool.com"
              color="text-primary-600"
            />
            <AirdropInfo title="Number of Claims" info="645" />
            <AirdropInfo
              title="Airdrop Address"
              info="0x632Ac5A28e73C1cf1174ba134824346974e2cC37"
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

// @ts-ignore
export const getStaticProps = ({ params }) => {
  return {
    props: {
      someData: params.slug,
    },
  };
};
