/* eslint-disable prettier/prettier */
'use client';
import React, { FC, useMemo } from 'react';
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import {
  PhantomWalletAdapter,
  SkyWalletAdapter,
  AlphaWalletAdapter,
  AvanaWalletAdapter,
  BitgetWalletAdapter,
  BitpieWalletAdapter,
  MathWalletAdapter,
  NekoWalletAdapter,
  CoinhubWalletAdapter,
  KeystoneWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import {
  WalletModalProvider,
  WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';
import * as web3 from '@solana/web3.js';
// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');

export const SolanaWallet: FC = () => {
  const endpoint = web3.clusterApiUrl('devnet');

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SkyWalletAdapter(),
      new AlphaWalletAdapter(),
      new AvanaWalletAdapter(),
      new BitgetWalletAdapter(),
      new BitpieWalletAdapter(),
      new MathWalletAdapter(),
      new NekoWalletAdapter(),
      new CoinhubWalletAdapter(),
      new KeystoneWalletAdapter(),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <WalletMultiButton
            style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
          />
          {/* <WalletDisconnectButton /> */}
        </WalletModalProvider>
      </WalletProvider>

      {/* <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider> */}
    </ConnectionProvider>
  );
};


