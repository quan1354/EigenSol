import { FC, FormEventHandler, useEffect, useState } from 'react';
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

interface HomeProps {
  faqList: FAQItem[];
}

const Home: FC<HomeProps> = ({ faqList }) => {
  useEffect(() => {
    const matomoSomeEvent: MatomoEventType = [
      'Lido_Frontend_Template',
      'Mount index component',
      'mount_index_component',
    ];

    trackEvent(...matomoSomeEvent);
  }, []);

  const handleSubmit: FormEventHandler<HTMLFormElement> | undefined = (
    event,
  ) => {
    event.preventDefault();
    alert('Submitted');
  };

  const contractRpc = useSTETHContractRPC();
  const tokenName = useContractSWR({
    contract: contractRpc,
    method: 'name',
  });

  // UI -> migrate to new file -> Navigation
  const { data } = useLidoSWR<number>('/api/oneinch-rate', standardFetcher);
  const oneInchRate = data ? (100 - (1 / data) * 100).toFixed(2) : 1;

  return (
    <Layout title="Withdrawals" subtitle="Withdraw unstaked SOL">
      <Head>
        <title>Lido | Frontend Template</title>
      </Head>
      <Block>
        <form action="" method="post" onSubmit={handleSubmit}>
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

          <Button style={{ marginTop: '8px' }} fullwidth type="submit">
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
