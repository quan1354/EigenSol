import { FC } from 'react';
import Link from 'next/link';
import {
  HeaderStyle,
  HeaderLogoStyle,
  HeaderActionsStyle,
} from './headerStyles';
import HeaderWallet from './headerWallet';
import HeaderMenu from './headerMenu';

const Header: FC = () => (
  <HeaderStyle size="full" forwardedAs="header">
    <HeaderLogoStyle>
      <Link href="/">
        <img
          src="https://www.jito.network/_next/image/?url=%2Fhomepage%2Fjito_logo_green_small.webp&w=1920&q=75"
          alt="Jido"
          height={25}
        />
      </Link>
    </HeaderLogoStyle>
    <HeaderMenu />
    <HeaderActionsStyle>
      <HeaderWallet />
    </HeaderActionsStyle>
  </HeaderStyle>
);

export default Header;
