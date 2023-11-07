import { useGetAirdrops } from '@/async_fns/wagmiHooks';
import { supabase } from '@/config/supabaseConfig';
import { SupabaseMap } from '@/pages/airdrops';
import { CombinedAirdrop } from '@/types/pandasiaTypes';
import { useEffect, useState } from 'react';

export default function WithdrawFunds() {
  const [airdropId, setAirdropId] = useState('');
  const [withdrawAmt, setWithdrawAmt] = useState('');
  const [supabaseMap, setSupabaseMap] = useState<SupabaseMap>({});
  const [combinedAirdrops, setCombinedAirdrops] = useState<CombinedAirdrop[]>([]);

  // Get contract data data
  const {
    data: contractAirdrops,
    isLoading: contractAirdropsIsLoading,
    isError: contractAirdropsIsError,
    error: contractAirdropsError,
  } = useGetAirdrops(BigInt(0), BigInt(0));

  useEffect(() => {
    if (Object.keys(supabaseMap).length == 0) {
      return;
    }
    if (!contractAirdrops || contractAirdrops.length == 0) {
      return;
    }

    let tempHydrated: CombinedAirdrop[] = [];

    contractAirdrops.forEach((contractAirdrop) => {
      if (!supabaseMap[Number(contractAirdrop.id)]) {
        return;
      }

      const hydratedAirdrop: CombinedAirdrop = {
        id: supabaseMap[Number(contractAirdrop.id)].id,
        contractId: contractAirdrop.id,
        owner: contractAirdrop.owner,
        erc20: contractAirdrop.erc20,
        claimAmount: contractAirdrop.claimAmount,
        root: contractAirdrop.root,
        startsAt: contractAirdrop.startsAt,
        expiresAt: contractAirdrop.expiresAt,
        onlyRegistered: contractAirdrop.onlyRegistered,
        balance: contractAirdrop.balance,
        companyName: supabaseMap[Number(contractAirdrop.id)].company_name,
        summary: supabaseMap[Number(contractAirdrop.id)].summary,
        description: supabaseMap[Number(contractAirdrop.id)].description,
        url: supabaseMap[Number(contractAirdrop.id)].url,
        logo: supabaseMap[Number(contractAirdrop.id)].logo,
        claimCount: supabaseMap[Number(contractAirdrop.id)].claim_count.claims,
      };

      tempHydrated.push(hydratedAirdrop);
    });

    setCombinedAirdrops(tempHydrated);
  }, [supabaseMap, contractAirdrops]);

  async function getAirdrops() {
    const query = await supabase.from('airdrop_info').select(
      `
        *,
        claim_count(
          claims
        ),
        airdrop_to_contract(
          contract_id
        )
    `,
    );
    if (query.error) {
      console.warn('Error fetching data from supabase', query.error);
      return;
    }

    if (query.data == null) {
      console.warn('No data returned from supabase');
      return;
    }

    //@ts-ignore supabase thinks airdrop_info is an array but it's just an object
    const airdrops: SupabaseReturnType[] = query.data;

    let pMap: SupabaseMap = {};

    airdrops.forEach((airdrop) => {
      pMap[airdrop.airdrop_to_contract.contract_id] = airdrop;
    });
    setSupabaseMap(pMap);
  }

  // Get supabase data
  useEffect(() => {
    getAirdrops();
  }, []);

  console.log(supabaseMap);

  function withdrawFunds() {}

  return (
    <div className="flex w-[580px] text-secondary-400 flex-col py-4 text-left">
      <span className="text-2xl font-bold tracking-[4px]">WITHDRAW FUNDS</span>
      <table className="border my-4 bg-secondary-800">
        <thead className="border">
          <tr>
            <th className="pl-2 border">Contract Id</th>
            <th className="pl-2 border">Company Name</th>
            <th className="pl-2 border">Amount Remaining</th>
            <th className="pl-2 border">AsEth</th>
          </tr>
        </thead>
        <tbody>
          {combinedAirdrops.map((airdrop) => {
            return (
              <tr className="border" key={airdrop.id}>
                <td className="pl-2 border">{Number(airdrop.contractId)}</td>
                <td className="pl-2 border">{airdrop.companyName}</td>
                <td className="pl-2 border">{Number(airdrop.balance)}</td>
                <td className="pl-2 border">
                  {Number(airdrop.balance / 1_000_000_000_000_000_000n)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <label>Airdrop Id</label>
      <input
        value={airdropId}
        onChange={(e) => setAirdropId(e.target.value)}
        className="p-2 bg-secondary-700 text-white"
        placeholder="Airdrop Id"
      />
      <label>Withdraw Amount</label>
      <input
        value={withdrawAmt}
        onChange={(e) => setWithdrawAmt(e.target.value)}
        className="p-2 bg-secondary-700 text-white"
        placeholder="Withdraw Amount"
      />
      <button className="border my-4 w-60 p-4 bg-orange-900" onClick={withdrawFunds}>
        Withdraw Funds
      </button>
    </div>
  );
}
