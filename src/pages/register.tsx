import Button from '@/components/ui/Button/Button';
import { CustomConnectButton } from '@/components/ui/Button/CustomConnectButton';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';
import Link from 'next/link';
import { BsArrowLeft } from 'react-icons/bs';

export default function Register() {
  function submitSignature() {
    // call to localhost:8000 register
    // get the proof from 	proof = `${pandasiaUrl}/proof/${root}?addr=${addrToRegister}&sig=${sigToVerify}`
    // then call the smart contract to register
    // pandasia::registerPChainAddr(proof.SigV, proof.SigR, proof.SigS, proof.Proof)
    //
    // returns nothing or
    //    "0x3d5607fc": "PAddrNotInValidatorMerkleTree()"
    //    "0x21ea10f8": "PAddrAlreadyRegistered()"
    //
    // Test signature 24eWufzWvm38teEhNQmtE9N5BD12CWUawv1YtbYkuxeS5gGCN6CoZBgU4V4WDrLa5anYyTLGZT8nqiEsqX7hm1k3jofswfx
    // P-addr P-avax1gfpj30csekhwmf4mqkncelus5zl2ztqzvv7aww
    // hex    0x424328bf10cdaeeda6bb05a78cff90a0bea12c02
  }

  return (
    <main className="flex">
      <section className={`p-6 flex flex-col w-full items-center min-h-screen bg-secondary-800`}>
        <Link className="self-start flex items-center gap-2 text-primary-500" href={'/'}>
          <BsArrowLeft size={'24px'} />
          <span>RETURN</span>
        </Link>

        <div className="h-full flex flex-col items-center justify-center">
          <Image src="/pandasia-logo.svg" alt="Next.js Logo" width={180} height={180} priority />
          <span className="text-primary-500">BY GOGOPOOL</span>
        </div>
      </section>
      <section
        className={`p-6 flex flex-col gap-2 w-full justify-center min-h-screen bg-primary-500`}
      >
        <div className="flex flex-col gap-2 p-12">
          <CustomConnectButton />
          <textarea className="p-4 text-secondary-800" placeholder="Submit Signature" />
          <Button onClick={submitSignature}>Submit Signature</Button>
          <Button>Go To Claim Page</Button>
        </div>
      </section>
    </main>
  );
}
