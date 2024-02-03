/* eslint-disable prettier/prettier */
import { FC, useEffect, useState } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
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
  // Solana,
  Stsol,
  Text,
  Input,
  Stack,
  StackItem,
} from '@lidofinance/lido-ui';
import { trackEvent, MatomoEventType } from '@lidofinance/analytics-matomo';

// import Wallet from 'components/wallet';
import Section from 'components/section';
import Layout from 'components/layout';
import Faq from 'components/faq';
import { standardFetcher } from 'utils';
import { FAQItem, getFaqList } from 'utils/faqList';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import idl from './idl.json';
import { SolanaWallet } from './SolanaWallet';

// import {
//   AnchorProvider,
//   Idl,
//   Program,
//   setProvider,
// } from '@project-serum/anchor';

interface HomeProps {
  faqList: FAQItem[];
}

// add on css styling
const InputWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spaceMap.md}px;
`;
const ButtonWrapper = styled.div`
  border-bottom: 0.5px solid;
`;

const Home: FC<HomeProps> = ({ faqList }) => {
  useEffect(() => {
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
    console.log('');
  };

  // UI -> migrate to new file -> Navigation
  const { data } = useLidoSWR<number>('/api/oneinch-rate', standardFetcher);
  const oneInchRate = data ? (100 - (1 / data) * 100).toFixed(2) : 1;

  const [activeComponent, setActiveComponent] = useState('Stake');
  return (
    <Layout title="This is Index Page" subtitle="Withdraw unstaked SOL">
      <Head>
        {/* <title>Lido | Frontend Template</title> */}
        <title>EigenSol</title>
      </Head>
      <Block>
        <Stack
          align="flex-start"
          direction="row"
          justify="flex-start"
          spacing="sm"
          wrap="wrap"
        >
          {activeComponent === 'Stake' ? (
            <ButtonWrapper>
              <StackItem>
                <Button
                  color="secondary"
                  size="sm"
                  variant="ghost"
                  onClick={() => setActiveComponent('Stake')}
                >
                  Stake
                </Button>
              </StackItem>
            </ButtonWrapper>
          ) : (
            <StackItem>
              <Button
                color="secondary"
                size="sm"
                variant="ghost"
                onClick={() => setActiveComponent('Stake')}
              >
                Stake
              </Button>
            </StackItem>
          )}

          {activeComponent === 'Withdraw' ? (
            <ButtonWrapper>
              <StackItem>
                <Button
                  color="secondary"
                  size="sm"
                  variant="ghost"
                  onClick={() => setActiveComponent('Withdraw')}
                >
                  Withdraw
                </Button>
              </StackItem>
            </ButtonWrapper>
          ) : (
            <StackItem>
              <Button
                color="secondary"
                size="sm"
                variant="ghost"
                onClick={() => setActiveComponent('Withdraw')}
              >
                Withdraw
              </Button>
            </StackItem>
          )}
        </Stack>

        {activeComponent === 'Stake' ? (
          // Stake component
          <Block>
            <InputWrapper>
              <Text size="xs">Enter amount</Text>
            </InputWrapper>
            <form action="" method="post">
              <InputWrapper>
                <Input fullwidth label="Amount" leftDecorator={<Stsol />} />
              </InputWrapper>
              <InputWrapper>
                <Input fullwidth disabled label="Your token address" />
              </InputWrapper>
              <InputWrapper>
                <Button fullwidth type="submit">
                  Start staking
                </Button>
              </InputWrapper>
              <DataTable>
                <DataTableRow title="You will receive">0 Stsol</DataTableRow>
                <DataTableRow title="Exchange rate">
                  0.012312 stSol
                </DataTableRow>
              </DataTable>
            </form>
          </Block>
        ) : (
          // Withdraw component
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
        )}
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
