/* eslint-disable prettier/prettier */
import { FC, useEffect } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import {
  useContractSWR,
  useSTETHContractRPC,
  useLidoSWR,
} from '@lido-sdk/react';
import { Block, Link, DataTable, DataTableRow } from '@lidofinance/lido-ui';
import { trackEvent, MatomoEventType } from '@lidofinance/analytics-matomo';

// import Wallet from 'components/wallet';
import Section from 'components/section';
import Layout from 'components/layout';
import Faq from 'components/faq';
import { standardFetcher } from 'utils';
import { FAQItem, getFaqList } from 'utils/faqList';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import idl from './idl.json';

// import {
//   AnchorProvider,
//   Idl,
//   Program,
//   setProvider,
// } from '@project-serum/anchor';

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
        <title>Index File</title>
      </Head>

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
