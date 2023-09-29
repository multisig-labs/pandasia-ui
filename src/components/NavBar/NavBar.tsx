import { colors } from '@/styles/theme/colors';
import { CustomConnectButton } from '../Button/CustomConnectButton';
import NavBarLink from './NarBarLink';
import { FaXTwitter, FaDiscord } from 'react-icons/fa6';

export default function NavBar() {
  return (
    <div className="flex basis-[1280px] items-center justify-between">
      <div className="flex gap-12">
        <NavBarLink name="CLAIMS" link="/pandasia" />
        <NavBarLink name="FAQ" link="/pandasia" />
        <NavBarLink name="ABOUT" link="/pandasia" />
        <NavBarLink name="GOGOPOOL" link="/pandasia" />
      </div>
      <div className="flex items-center gap-8">
        <CustomConnectButton />
        <div className="hover-glow">
          <FaXTwitter size={24} />
        </div>
        <div className="hover-glow">
          <FaDiscord size={24} />
        </div>
      </div>
    </div>
  );
}
