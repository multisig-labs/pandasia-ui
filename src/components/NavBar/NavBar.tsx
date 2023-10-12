import Link from 'next/link';
import { CustomConnectButton } from '../Button/CustomConnectButton';
import NavBarLink from './NarBarLink';
import { FaXTwitter, FaDiscord } from 'react-icons/fa6';

export default function NavBar() {
  return (
    <div className="flex basis-[1280px] items-center justify-between">
      <div className="flex gap-12">
        <NavBarLink name="CLAIMS" link="/pandasia" />
        <NavBarLink name="ABOUT" link="/about" />
        <NavBarLink name="GOGOPOOL" link="https://app.gogopool.com" blank />
      </div>
      <div className="flex items-center gap-8">
        <CustomConnectButton />
        <Link className="hover-glow" href="https://twitter.com/gogopool_" target="_blank">
          <FaXTwitter size={24} />
        </Link>
        <Link className="hover-glow" href="https://discord.gg/4fNtjkyuNw" target="_blank">
          <FaDiscord size={24} />
        </Link>
      </div>
    </div>
  );
}
