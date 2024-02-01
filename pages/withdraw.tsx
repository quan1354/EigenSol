/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import { FC, useEffect } from 'react';
import Head from 'next/head';
import {
  Wallet,
  // useAnchorWallet,
  // useConnection,
} from '@solana/wallet-adapter-react';
import {
  Connection,
  PublicKey,
  Transaction,
  TransactionSignature,
  Keypair,
  LAMPORTS_PER_SOL,
  clusterApiUrl,
} from '@solana/web3.js';
import {
  MessageSignerWalletAdapterProps,
  SendTransactionOptions,
  SignerWalletAdapterProps,
  WalletName,
} from '@solana/wallet-adapter-base';
// import * as anchor from "@project-serum/anchor"
import {
  Block,
  Link,
  DataTable,
  DataTableRow,
  Button,
} from '@lidofinance/lido-ui';
import { trackEvent, MatomoEventType } from '@lidofinance/analytics-matomo';
import Section from 'components/section';
import Layout from 'components/layout';
import { SolanaWallet } from './SolanaWallet';
import {
  useContractSWR,
  useSTETHContractRPC,
  useLidoSWR,
} from '@lido-sdk/react';
import { standardFetcher } from 'utils';

// import idl from './idl.json';
// import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
// import {
//   AnchorProvider,
//   setProvider,
//   Program,
//   Idl,
// } from '@project-serum/anchor';

interface WalletContextState {
  setTransactionUrl: any;
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

const withdraw: FC<WalletContextState> = () => {
  // Anchor Set up
  // const [program, setProgram] = useState('');
  // const { connection } = useConnection();
  // const wallet = useAnchorWallet();

  // if (wallet) {
  //   const provider = new AnchorProvider(connection, wallet, {});
  //   setProvider(provider);
  // }

  // const programId = new PublicKey(
  //   'CdKFiRMHeUX6P74CfXRwnidMPqDgtbbCsN59iH8Kudwq',
  // );
  // const program = new Program(idl as Idl, programId);

  useEffect(() => {
    const matomoSomeEvent: MatomoEventType = [
      'Lido_Frontend_Template',
      'Mount index component',
      'mount_index_component',
    ];

    trackEvent(...matomoSomeEvent);

    // let provider: anchor.Provider;

    // try {
    //   provider = anchor.getProvider();
    // } catch {
    //   provider = new anchor.AnchorProvider(connection, wallet, {});
    //   anchor.setProvider(provider);
    // }

    // const program = new anchor.Program(idl as anchor.Idl, PROGRAM_ID);
    // setProgram(program);
  }, []);

  const contractRpc = useSTETHContractRPC();
  const tokenName = useContractSWR({
    contract: contractRpc,
    method: 'name',
  });

  // UI -> migrate to new file -> Navigation
  const { data } = useLidoSWR<number>('/api/oneinch-rate', standardFetcher);
  const oneInchRate = data ? (100 - (1 / data) * 100).toFixed(2) : 1;

  // Get Credential from wallet
  const wallet = new Keypair();
  const publicKey = new PublicKey(wallet.publicKey);
  const secretKey = wallet.secretKey;

  const getWalletBalance = async () => {
    try {
      const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
      const walletBalance = await connection.getBalance(publicKey);
      console.log(`Wallet balance is ${walletBalance}`);
    } catch (err) {
      console.error(err);
    }
  };

  const airDropSol = async () => {
    try {
      const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
      const fromAirDropSignature = await connection.requestAirdrop(
        publicKey,
        2 * LAMPORTS_PER_SOL,
      );
      const latestBlockHash = await connection.getLatestBlockhash();
      await connection.confirmTransaction({
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        signature: fromAirDropSignature,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const withdrawToken = async () => {
    console.log(publicKey);
    console.log(secretKey);
    // const transactionSignature = await program.methods
    //   .instructionName()
    //   .accounts({})
    //   .signers([])
    //   .rpc();
    // const confirmation = await connection.confirmTransaction(
    //   transactionSignature,
    //   'confirmed',
    // );
    // console.log('Transaction confirmed:', confirmation);
    // const accounts = await program.account.counter.all();
    // console.log(accounts);

    await getWalletBalance();
    await airDropSol();
    await getWalletBalance();
  };

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
            style={{ marginTop: '8px' }}
            onClick={withdrawToken}
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
    </Layout>
  );
};

export default withdraw;
