import { FC } from 'react';
import Link from 'next/link';

import {
  HeaderStyle,
  HeaderLogoStyle,
  HeaderActionsStyle,
} from './headerStyles';
import HeaderWallet from './headerWallet';
// import HeaderMenu from './headerMenu';

const Header: FC = () => (
  <HeaderStyle size="full" forwardedAs="header">
    <HeaderLogoStyle>
      <Link href="/">
        <img
          src="./eigensol_logo.png"
          alt="Eigensol"
          style={{
            marginTop: '7px',
          }}
          height={32}
        />
      </Link>
    </HeaderLogoStyle>
    {/* <HeaderMenu /> */}
    <HeaderActionsStyle>
      <HeaderWallet />
    </HeaderActionsStyle>
  </HeaderStyle>
);

export default Header;
