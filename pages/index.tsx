/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable prettier/prettier */
import { FC, useEffect, useState} from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import {
  useContractSWR,
  useSTETHContractRPC,
  useLidoSWR,
} from '@lido-sdk/react';
import {
  Block,
  Link,
  DataTable,
  DataTableRow,
  Button,
} from '@lidofinance/lido-ui';
import { trackEvent, MatomoEventType } from '@lidofinance/analytics-matomo';

// import Wallet from 'components/wallet';
import Section from 'components/section';
import Layout from 'components/layout';
import Faq from 'components/faq';
import { standardFetcher } from 'utils';
import { FAQItem, getFaqList } from 'utils/faqList';
import { SolanaWallet } from './SolanaWallet';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import idl from './idl.json';
import {
  Wallet,
  useAnchorWallet,
  useConnection,
} from '@solana/wallet-adapter-react';
import {
  Connection,
  PublicKey,
  Transaction,
  TransactionSignature,
} from '@solana/web3.js';
import {
  MessageSignerWalletAdapterProps,
  SendTransactionOptions,
  SignerWalletAdapterProps,
  WalletName,
} from '@solana/wallet-adapter-base';
// import {
//   AnchorProvider,
//   Idl,
//   Program,
//   setProvider,
// } from '@project-serum/anchor';
import * as anchor from "@project-serum/anchor"
interface HomeProps {
  setTransactionUrl: any;
  faqList: FAQItem[];
  // Wallet Context State
  autoConnect: boolean;
  wallets: Wallet[];
  wallet: Wallet | null;
  publicKey: PublicKey | null;
  connecting: boolean;
  connected: boolean;
  disconnecting: boolean;
  select(walletName: WalletName): void;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  sendTransaction(
    transaction: Transaction,
    connection: Connection,
    options?: SendTransactionOptions,
  ): Promise<TransactionSignature>;
  signTransaction: SignerWalletAdapterProps['signTransaction'] | undefined;
  signAllTransactions:
    | SignerWalletAdapterProps['signAllTransactions']
    | undefined;
  signMessage: MessageSignerWalletAdapterProps['signMessage'] | undefined;
  
}



const Home: FC<HomeProps> = ({ faqList, setTransactionUrl }) => {
  const [program, setProgram] = useState<anchor.Program>()
  const { connection } = useConnection();
  const wallet = useAnchorWallet();

  // const provider = new AnchorProvider(connection, wallet!, {});
  // setProvider(provider);

  const PROGRAM_ID = new anchor.web3.PublicKey(`CdKFiRMHeUX6P74CfXRwnidMPqDgtbbCsN59iH8Kudwq`)
  //const programId = new PublicKey('CdKFiRMHeUX6P74CfXRwnidMPqDgtbbCsN59iH8Kudwq');
  //const program = new Program(idl as Idl, programId);
  useEffect(() => {
    let provider: anchor.Provider
    try {
      provider = anchor.getProvider()
    } catch {
      provider = new anchor.AnchorProvider(connection, wallet!, {})
      anchor.setProvider(provider)
    }

    const program = new anchor.Program(idl as anchor.Idl, PROGRAM_ID)
    setProgram(program)

    const matomoSomeEvent: MatomoEventType = [
      'Lido_Frontend_Template',
      'Mount index component',
      'mount_index_component',
    ];

    trackEvent(...matomoSomeEvent);
  }, []);

  const contractRpc = useSTETHContractRPC();
  const tokenName = useContractSWR({
    contract: contractRpc,
    method: 'name',
  });

  const withdrawToken = async () => {
    const newAccount = anchor.web3.Keypair.generate()
    const accounts = await program?.account.counter.all()
    console.log(accounts)

    const sig = await program?.methods
      .initialize()
      .accounts({
        counter: newAccount.publicKey,
      })
      .signers([newAccount])
      .rpc()

    setTransactionUrl(`https://explorer.solana.com/tx/${sig}?cluster=devnet`)
  };


  // UI -> migrate to new file -> Navigation
  const { data } = useLidoSWR<number>('/api/oneinch-rate', standardFetcher);
  const oneInchRate = data ? (100 - (1 / data) * 100).toFixed(2) : 1;

  return (
    <Layout title="Withdrawals" subtitle="Withdraw unstaked SOL">
      <Head>
        <title>EigenSol</title>
      </Head>
      <Block>
        <form action="" method="post">
          {/* <InputWrapper>
            <Input
              fullwidth
              placeholder="0"
              leftDecorator={<Steth />}
              label="Token amount"
            />
          </InputWrapper> */}

          <p
            style={{
              fontSize: '16px',
              textAlign: 'center',
              marginTop: '96px',
              marginBottom: '96px',
            }}
          >
            Connect wallet to see your stake accounts
          </p>

          <SolanaWallet></SolanaWallet>

          <Button
            onClick={withdrawToken}
            style={{ marginTop: '8px' }}
            fullwidth
            type="submit"
          >
            Withdraw
          </Button>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '24px',
            }}
          >
            <div>Transaction cost</div>
            <div>~ 0.000005 SOL ($0.00048)</div>
          </div>
        </form>
      </Block>
      <Section title="Data table" headerDecorator={<Link href="#">Link</Link>}>
        <Block>
          <DataTable>
            <DataTableRow title="Token name" loading={tokenName.initialLoading}>
              {tokenName.data}
            </DataTableRow>
            <DataTableRow title="1inch rate" loading={tokenName.initialLoading}>
              {oneInchRate}
            </DataTableRow>
          </DataTable>
        </Block>
      </Section>
      <Faq faqList={faqList} />
    </Layout>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<HomeProps> = async () => ({
  props: {
    faqList: await getFaqList(['lido-frontend-template']),
  },
});
