import { supabase } from '@/config/supabase';

export default function EDog() {
  async function getSupabaseAirdrop() {
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
      .eq(`id`, 23)
      .limit(1)
      .single();

    if (!query.data) {
      console.warn('no data');
      return;
    }

    console.log('EDOGS TIME', query.data);
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <div onClick={getSupabaseAirdrop}>Just a little something</div>;
    </div>
  );
}
