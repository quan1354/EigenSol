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

The response should be like this:

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

## Frontend Stack - Lido Frontend Template

As for the frontend, we are using [lido-frontend-template](https://github.com/lidofinance/lido-frontend-template)

Below are the stack included in the frontend template:

- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/docs/getting-started) | API routes, server-side rendering
- [ethers](https://docs.ethers.io/v5/) | Ethereum library
- [web3react](https://github.com/NoahZinsmeister/web3-react) | Web3 Provider and wallet connectors
- [SWR](https://swr.vercel.app/) | Data fetching and caching
- [Lido UI](https://github.com/lidofinance/ui) | Lido UI React component library
- [styled-components](https://styled-components.com/docs) | custom styled React components
- [Anchor](https://www.anchor-lang.com/) | framework for Solana's Sealevel runtime

### Pre-requisites

- Node.js v12+
- Yarn package manager

## Steps to do when clone this repo

Step 0. Read `DOCS.md` in the root of the project

Step 1. Copy the contents of `.env` to `.env.local`

```bash
cp .env .env.local
```

Step 2. Fill out the `.env.local`. You may need to sign up for [Infura](https://infura.io/) or [Alchemy](https://www.alchemy.com/), if you haven't already, to be able to use Ethereum JSON RPC connection.

Step 3. Install dependencies

```bash
yarn install
```

Step 4. Start the development server

```bash
yarn dev
```

Step 5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Navigate the component by clicking on the two buttons available
### Stake page
![alt text](image.png)

### Withdraw page
![alt text](image-1.png)