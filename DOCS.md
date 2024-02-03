# Eigensol - EigenLayer on Solana

Welcome to Eigensol, an implementation of EigenLayer on the Solana blockchain. Eigensol aims to provide a platform for connecting stakers and infrastructure developers on Solana, offering economic security, restaking options, and pooled security for various decentralized infrastructures.

## Overview

Eigensol is a Solana-based implementation inspired by EigenLayer, a protocol designed to simplify the process of building decentralized infrastructures. The platform allows stakers to provide economic security using any Solana-native token, restake their stake, and contribute to the security of various infrastructures.

## Key Features
Staking Flexibility: Stakers can provide economic security using verified liquidity staked token (LST) or Solana-native token.
Restaking Options: Stakers have the flexibility to restake their LST and earn native SOL rewards.
Pooled Security: Eigensol pools security through restaking, preventing fragmentation.

## Architecture

### Core Instructions

This program is having 5 functions:

1. createtokenpool - Create token pool and can only be called by admin. It accepts `token : pubkey` to setup the token pool for user to deposit. It initiates `adminStakingWallet` and `stakingToken`.

2. stake - Staking function called by user. It accepts `stakeAmount : u64` and initiate via CPI, to perform token transfer. The `stakingToken` is sent from `userStakingWallet` to `adminStakingWallet`.

3. withdraw - Withdraw function called by user. It accepts `amount : u64` and check if user have reward. If yes, it will perform 2 actions. Transferring reward from `stakingToken` to `userStakingWallet` and transfering withdraw amount token from `adminStakingWallet` to `userStakingWallet`. If no, it will only transfer withdraw amount. 

4. addavs - Adding Actively Validated Services (AVS) via inputting public key of `validatorAccount`. This section can only be called by admin. To be developed for allowing slashing happened and managing slashing logic and also unbonding period.

5. removeavs - Remove AVS via inputting public key of `validatorAccount`. This section can only be called by admin. To be developed for allowing slashing happened and managing slashing logic and also unbonding period.

### Core Accounts

This program is having 2 accounts:

1. PoolInfo:

```
  pub total_balance: u32,
  pub token: Pubkey,
  pub start_slot: u64,
  pub end_slot: u64,
  pub staker_address: Vec<Pubkey>,
  pub avs_list: Vec<Pubkey>,
  pub admin_address: Pubkey,
```

2. UserInfo

```
  pub stake_amount: u64,
  pub deposit_slot: u64,
```

## Interacting with a contract

_Note! The words program and contract are used interchangeably._

**Step 1.** Before you are ready to work with your contract, you will need to install rust, solana-cli and anchor-cli.

- [Rust](https://www.rust-lang.org/tools/install) | Rust programming language
- [Solana-cli](https://docs.solanalabs.com/cli/install) | Solana framework for building program
- [Anchor](https://www.anchor-lang.com/) | framework for Solana's Sealevel runtime

_Note! Windows user might need to install WSL2 to run._

If everything goes well, please go to `program` directory via `cd program`.

**Step 2.** After that, generate a pair of public and private keys at solana/id.json via `solana-keygen new --outfile /root/solana/my_wallet.json`. You can find the created wallet public address using `solana-keygen pubkey solana/id.json` and you can verify the wallet via `solana-keygen verify FEBxPgsTXTdWkifpiGUSjfzS7ztBFJKPnaHT8A7iUdFc solana/id.json`.

**Step 3.** Check your config file `solana config get`.

The response should be like this
```
Config File: /root/.config/solana/cli/config.yml
RPC URL: http://api.devnet.solana.com
WebSocket URL: ws://api.devnet.solana.com/ (computed)
Keypair Path: /root/.config/solana/id.json
Commitment: confirmed
```

Use `solana config set --keypair solana/id.json` and `solana config set --url https://api.devnet.solana.com` to setup the correct keypair path as well as RPC URL.

**Step 4.** Request 2 SOL airdrop to your wallet `solana airdrop 2`.

**Step 5.** Run `anchor build` and then you will see your generated IDL at `target/idl/eigensol.json`.

**Step 6.** Run `anchor deploy` and successfully deploy your contract.

## Stack

This stack includes:

- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/docs/getting-started) | API routes, server-side rendering
- [ethers](https://docs.ethers.io/v5/) | Ethereum library
- [web3react](https://github.com/NoahZinsmeister/web3-react) | Web3 Provider and wallet connectors
- [SWR](https://swr.vercel.app/) | Data fetching and caching
- [Lido UI](https://github.com/lidofinance/ui) | Lido UI React component library
- [styled-components](https://styled-components.com/docs) | custom styled React components
- [Anchor](https://www.anchor-lang.com/) | framework for Solana's Sealevel runtime

## Additional Features To Be Added
- [x] Multiple Token Support: Eigensol supports staking with multiple Solana-native tokens.
- [ ] Unbonding Period: A time delay in the withdrawal process to enhance security.
- [ ] Modularized Slashing: Slashing mechanism is modular and efficient to reduce gas costs.
- [ ] Delagation Manager: Allows operators to register and tracks operator shares for stakers.
- [ ] SlasherManager: Provides AVS developers with the interface to determine slashing logic.

### Build-time Variables

Currently our CI pipeline DOES NOT support build-time environment variables (https://nextjs.org/docs/api-reference/next.config.js/runtime-configuration). This is because we build a single docker image for both the mainnet and testnet versions of the application and specify environment variables at the start of the container. We strongly recommend that you avoid using any build-time variables so that your application can be integrated into our pipeline as smoothly as possible. Other than that, you are free to add as many environment variables as your application may require.

If you need to access an environment variable on the client (e.g. supported networks, analytics IDs), you will need to specify a regular server-side environment variable and export it to the client using `getInitialProps`. Below is the detailed procedure on how to do it.

**Step 1.** Specify a variable in `.env.local`, e.g.

```bash
# .env.local
MY_PUBLIC_VAR=hello
```

**Step 2.** Add it to `publicRuntimeConfig` in `next.config.js`

```js
// next.config.js

const myPublicVar = process.env.MY_PUBLIC_VAR;

module.exports = {
  // ...
  publicRuntimeConfig: {
    // ...
    myPublicVar,
  },
};
```

If you take a look at `_app.tsx`, you will see that the public runtime config will be passed down to our app context using the `getInitialProps` function.

**Step 3.** Export the `getServerSideProps` function from each page where you are planning to use your variable. The function doesn't have to return anything but it forces Next.js to run `getInitialProps` on the server.

```ts
// index.tsx

const HomePage: FC<Props> = () => {
  // ...
};

export const getServerSideProps: GetServerSideProps<
  WithdrawProps
> = async () => {
  return {
    props: {},
  };
};
```

**Step 4.** Use [React Context](https://reactjs.org/docs/context.html) to provide your variable. You can find an example providing `defaultChain` and `supportedChainIds` variables in files:

- [providers/index.tsx](providers/index.tsx)
- [providers/web3.tsx](providers/web3.tsx)

Read more about [runtime configuration](https://nextjs.org/docs/api-reference/next.config.js/runtime-configuration) and [automatic static optimization](https://nextjs.org/docs/advanced-features/automatic-static-optimization)

## JSON RPC Provider

Apart from Web3 connection provided by the user's wallet, we use an additional JSON RPC connection to be able to query Ethereum before Web3 connection is established. This allows us to show any relevant information the user might need to know before deciding to connect their wallet.

This means that you may have to register an account with a third-party Ethereum provider such [Infura](https://infura.io/) or [Alchemy](https://www.alchemy.com/) whose free plans are more than enough for development. Once you get your hands on the API Key, specify it as a respective variable (`INFURA_API_KEY` or `ALCHEMY_API_KEY`) in your `.env.local` and you are ready to go.

To use JSON RPC Provider, use the `useEthereumSWR` hook like so,

```ts
function MyComponent: FC<{}> = () => {
  const gasPrice = useEthereumSWR({ method: 'getGasPrice' });
  // ..
}
```

---

Note! The `pages/api/rpc.ts` Next.js API route serves as a proxy for all JSON RPC requests so that the Infura/Alchemy API key is not exposed to the browser.

## Lido UI React Components Library

In order to ensure visual consistency across all Lido frontends and to speed up the development process, Lido has a React Components library that is distributed as an npm package, `@lidofinance/lido-ui`. It comes with two themes (light and dark) and various basic components including buttons, blocks, inputs, accordions, tables, text components, modals, icons, identicons, tooltips and more.

It is already listed as a dependency to this project and you may start using it right away, e.g.

```tsx
import { Button } from '@lidofinance/lido-ui';

const MyComponent: FC<{}> = () => {
  return (
    <Button fullwidth color="primary" variant="outlined">
      Click me
    </Button>
  );
};
```

If you want to minimize the size of your JavaScript bundle, you can tree-shake the library for necessary components. Install individual packages like so,

```bash
yarn add @lidofinance/button
```

For more visit the Lido UI repository at: https://github.com/lidofinance/ui

Check out Lido UI Storybook at: https://ui.lido.fi/

## Git commit messages

This repo features a pre-commit hook that lints your commit messages and rejects them if they do not follow the [Conventional Commit](https://www.conventionalcommits.org/en/v1.0.0/) standards specified in [config](/commitlint.config.js). If you are not confident in composing a beautiful commit message on your own, you are free to make use of any Conventional Commit IDE extensions or use the CLI helper already installed in this repo,

```bash
$ git add .
$ yarn commit
```

## Icons

Yon can use this mockup to generate icons for the app:
https://www.figma.com/file/kUipxQFrZq28GXZvDqf4sA/Lido-Icons

## Monitoring

Before your application is ready to be deployed within the Lido infrastructure, it should meet certain codebase requirements that will make it more secure, resilient and easier to debug. These are as follows,

- your app must send a [`Content-Security-Policy`](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) header with an appropriate policy to detect and mitigate XSS attacks;
- you app must log essential server-side operations to output in JSON format without revealing any secrets or user addresses;
- any `Content-Security-Policy` violations must be reported to [`api/csp-report`](page/api/csp-report.ts) API route where they will be logged and picked up by our monitoring system;
- your app should export relevant metrics at [`api/metrics`](page/api/metrics.ts) which will give us a better insight into your app's operation and enable us to set up alerts.

### Content-Security-Policy

This template features a boilerplate for configuring `Content-Security-Policy`. If you open up [.env](/.env), you will see three environment variables: `CSP_TRUSTED_HOSTS`, `CSP_REPORT_ONLY`, and `CSP_REPORT_URI`. You will need to fill these out in your `.env.local` file.

- `CSP_TRUSTED_HOSTS` is a comma-separated list of third-party hosts that your application depends on. These can be CDN services, image hosting websites, third-party APIs, etc. You can specify them directly or use a wildcard (which is supported in most modern browsers);
- `CSP_REPORT_ONLY` is a flag that enables/disables report-only mode. In report-only mode, violations are reported but the associated resources/requests are not blocked by the browser. This is useful when you want to test out your `Content-Security-Policy` without the risk of breaking the application for your users. Any other value other than `true` will enable blocking mode;
- `CSP_REPORT_URI` instructs the browser where the violations are ought to be reported to. Because this CSP directive does not support relative paths, the value of this variable depends on your application's environment. For example, if you're running the app locally, this is usually `http://localhost:3000/api/csp-endpoint`.

Below are some example values,

```bash
# allow requests to third-party-api.com and any lido.fi subdomains
CSP_TRUSTED_HOSTS=third-party-api.com,*.lido.fi
# blocking mode enabled
CSP_REPORT_ONLY=false
# report CSP violations to https://app.lido.fi/api/csp-report
CSP_REPORT_URI=https://app.lido.fi/api/csp-report
```

These variables are passed to `serverRuntimeConfig` in `next.config.js` and then with the help of the [`next-secure-headers`](https://www.npmjs.com/package/next-secure-headers) npm package are transformed into a proper `Content-Security-Header` in [utils/withCSP](/utils//withCsp.ts), which is shipped to the client on each request.

Learn more about `Content-Security-Policy` on [MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP).

### Server-side logger

The template comes with its own custom JSON logger out of the box. Simply import and start logging, e.g.

```typescript
import { serverLogger } from 'utils/serverLogger';

function sendSomeRequest() {
  serverLogger.debug('sending some request');
  try {
    // request logic

    serverLogger.info('some request successful');
  } catch {
    serverLogger.error('some request failed');
  }
}
```

The logger utilizes the [`next-logger`](https://www.npmjs.com/package/next-logger) package which transforms any system output to JSON. As you can see in `package.json` it is only enabled for `start` script meaning it will only work in production mode. In development you will see your usual `console` logs.

Before deploying to production, however, you must make sure that no secrets are exposed in logs. To do this, please specify patterns to mask your secrets in [utils/serverLogger](/utils/serverLogger.ts). There you will find that Infura/Alchemy API keys and user addresses are already masked using the [`@darkobits/mask-string`](https://www.npmjs.com/package/@darkobits/mask-string) module.

### Metrics

We use Prometheus together with Grafana to set up monitoring and alerting for your app. Your app should collect the essential configuration and network activity and export them as metrics at [api/metrics](/pages/api/metrics.ts) using the `prom-client` package. To start aggregating the data, specify your app's metrics prefix in [config/metrics](/config/metrics.ts).

If you open `utils/metrics` directory, you will find the examples of required metrics for our apps and how to export them. Among these are build information (version, branch and commit), network configuration (default network, supported networks), contract configuration (names and addresses of contracts that your app interacts with) and network requests.

Below is an example of a network requests histogram,

```typescript
import { METRICS_PREFIX } from 'config';
import { Histogram } from 'prom-client';

// this metric collects HTTP statuses and response times of API requests
const apiResponses = new Histogram({
  name: METRICS_PREFIX + '_api_response',
  help: 'API responses',
  labelNames: ['host', 'status'],
  buckets: [0.1, 0.2, 0.3, 0.6, 1, 1.5, 2, 5],
});

async function sendSomeRequest() {
  const apiHost = 'some-api.com';

  // start metric timer
  const end = apiResponses.startTimer();

  // request logic
  const response = await fetch(apiHost);
  const data = await response.json();

  // stop timer and collect API response time
  end({
    host: someApi,
    status: response.status,
  });

  return data;
}
```

Learn more about [Prometheus metrics](https://prometheus.io/docs/concepts/metric_types/) and [`prom-client`](https://github.com/siimon/prom-client).

### Cache-control

#### API

Use cache control wherever possible. For example - GET requests for statistical data.
For simple setting of cache-control headers, `@lidofinance/next-api-wrappers` are used.
An example can be viewed [here](pages/api/oneinch-rate.ts).
API wrappers documentation [here](https://github.com/lidofinance/warehouse/tree/main/packages/next/api-wrapper).

##### Example:

```typescript
import {
  API,
  wrapRequest,
  cacheControl,
  defaultErrorHandler,
} from '@lidofinance/next-api-wrapper';
import { serverLogger } from 'utils/serverLogger';

// Proxy for third-party API.
const someApiRequest: API = async (req, res) => {
  const response = await fetch('api-url');
  const data = await response.json();

  res.json(data);
};

// Example showing how to use API wrappers (error handler and cahce control)
export default wrapRequest([
  cacheControl(),
  defaultErrorHandler({ serverLogger }),
])(someApiRequest);
```

#### Static files

For caching static files (for example manifest.json), a `Next Middleware` is used. For simple setting of cache-control file headers, `@lidofinance/next-cache-files-middleware` are used. Its implementation is [here](middleware.ts).
The template uses default caching from the package.
Don't forget about the "config" constant. The matcher values need to be constants so they can be statically analyzed at build-time. Dynamic values such as variables will be ignored.
Files cache-control documentation [here](https://github.com/lidofinance/warehouse/tree/main/packages/next/cache-files-middleware).
You can read about `Next Middleware` there - https://nextjs.org/docs/advanced-features/middleware
