import { FadeTransition } from '@/components/Pages/PageTransitions';

export default function SecretTunnel() {
  return (
    <FadeTransition>
      <main className="hs-bg relative flex min-h-screen flex-col items-center bg-secondary-800"></main>
    </FadeTransition>
  );
}
