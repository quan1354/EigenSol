import { FC } from 'react';
import Head from 'next/head';
import { ServicePage } from '@lidofinance/lido-ui';

const About: FC = () => (
  <ServicePage title="404">
    <Head>
      <title>Lido | About</title>
    </Head>
  </ServicePage>
);

export default About;
