// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { supabase } from '@/config/supabase';
// import { useSupabaseClient } from '@supabase/auth-helpers-react';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  newCount: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { id, claimCount } = req.body;

  const { data, error } = await supabase
    .from('claim_count')
    .update({ claims: claimCount + 1 })
    .eq('id', id)
    .select();

  if (!data) {
    res.status(500);
    return;
  }

  res.status(200).json({ newCount: data[0].claims });
}
