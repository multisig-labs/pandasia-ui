import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import Link from 'next/link';

const LoginPage = () => {
  const supabaseClient = useSupabaseClient();
  const user = useUser();

  if (!user)
    return (
      <Auth
        redirectTo="http://localhost:3000"
        appearance={{
          style: {
            input: { color: 'white' },
          },
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: 'red',
                brandAccent: 'darkred',
              },
            },
          },
        }}
        supabaseClient={supabaseClient}
        providers={[]}
        socialLayout="horizontal"
      />
    );

  return (
    <>
      <button onClick={() => supabaseClient.auth.signOut()}>Sign out</button>
      <p>user:</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <p>client-side data fetching with RLS</p>
      <Link href={'/alter_airdrop'}>Go to airdrop page</Link>
    </>
  );
};

export default LoginPage;
