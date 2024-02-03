#![allow(unused)]
use anchor_lang::prelude::*;
use std::str::FromStr;
use anchor_spl::token_interface::{Mint, TokenAccount, TokenInterface};
pub mod stubs;
// pub use stubs::*;
pub mod state;
pub use state::*;

declare_id!("GiYyM5jXdeaaJY8ixTrhKJGoP3UfwMrAeYduRSmW7VnG");

#[program]
pub mod eigensol {
    use super::*;
    
    pub fn createtokenpool(ctx: Context<Createtokenpool>,token:Pubkey, start_slot:u64, end_slot:u64) -> Result<()> {
        stubs::createtokenpool::createtokenpool(ctx,token, start_slot, end_slot)}

    #[derive(Accounts)]
    #[instruction(token:Pubkey, start_slot:u64, end_slot:u64)]
    pub struct Createtokenpool<'info>{
	/// CHECK: fee_payer requires an account info
	#[account(mut, signer)]
	pub fee_payer : AccountInfo<'info>,
        #[account(init_if_needed, space=3528, payer=fee_payer, seeds = [b"poolinfo"], bump)]
	pub token_pool: Account<'info,PoolInfo>,
    #[account(mut)]
    pub admin: Signer<'info>, 
    #[account(mut)]
    pub staking_token: InterfaceAccount<'info, Mint>,
    #[account(mut)]
    pub admin_staking_wallet: InterfaceAccount<'info, TokenAccount>,
	/// CHECK: system_program requires an account info
	pub system_program : Program<'info, System>,}

    
    pub fn stake(ctx: Context<Stake>,stake_amount:u64) -> Result<()> {
        stubs::stake::stake(ctx,stake_amount)}

    #[derive(Accounts)]
    #[instruction(amount:u64)]
    pub struct Stake<'info>{    
	/// CHECK: fee_payer requires an account info
	#[account(mut, signer)]
	pub fee_payer : AccountInfo<'info>,
        #[account(mut, seeds = [b"poolinfo"], bump)]
	pub token_pool: Account<'info,PoolInfo>,
    #[account(mut)]
    pub user: Signer<'info>,
    /// CHECK:
    #[account(mut)]
    pub admin: AccountInfo<'info>,
        #[account(init_if_needed, space=20, payer=fee_payer, seeds = [b"userinfo"], bump)]
    pub user_info: Account<'info, UserInfo>,
    #[account(mut)]
    pub user_staking_wallet: InterfaceAccount<'info, TokenAccount>,
    #[account(mut)]
    pub admin_staking_wallet: InterfaceAccount<'info, TokenAccount>,
    #[account(mut)]
    pub staking_token: InterfaceAccount<'info, Mint>,
    pub token_program: Interface<'info, TokenInterface>,
    pub system_program: Program<'info, System>,}


    pub fn withdraw(ctx: Context<Withdraw>,amount:u32) -> Result<()> {
        stubs::withdraw::withdraw(ctx,amount)}

    #[derive(Accounts)]
    #[instruction(amount:u32)]
    pub struct Withdraw<'info>{  
	/// CHECK: fee_payer requires an account info
	#[account(mut, signer)]
	pub fee_payer : AccountInfo<'info>,
        #[account(mut, seeds = [b"poolinfo"], bump)]
	pub token_pool: Account<'info,PoolInfo>,
    /// CHECK:
    #[account(mut)]
    pub user: AccountInfo<'info>,
    /// CHECK:
    #[account(mut)]
    pub admin: AccountInfo<'info>,
    #[account(mut)]
    pub user_info: Account<'info, UserInfo>,
    #[account(mut)]
    pub user_staking_wallet: InterfaceAccount<'info, TokenAccount>,
    #[account(mut)]
    pub admin_staking_wallet: InterfaceAccount<'info, TokenAccount>,
    #[account(mut)]
    pub staking_token: InterfaceAccount<'info, Mint>,
    pub token_program: Interface<'info, TokenInterface>,}


    pub fn addavs(ctx: Context<AddAVS>,validator_account:Pubkey) -> Result<()> {
        stubs::addavs::addavs(ctx,validator_account)}

    #[derive(Accounts)]
    #[instruction(validator_account:Pubkey)]
    pub struct AddAVS<'info>{  
	/// CHECK: fee_payer requires an account info
	#[account(mut, signer)]
	pub fee_payer : AccountInfo<'info>,
        #[account(mut, seeds = [b"poolinfo"], bump)]
	pub token_pool: Account<'info,PoolInfo>,     
	/// CHECK: authority requires an account info
	pub authority : AccountInfo<'info>,}

    
    pub fn removeavs(ctx: Context<RemoveAVS>,validator_account:Pubkey) -> Result<()> {
        stubs::removeavs::removeavs(ctx,validator_account)}
        
    #[derive(Accounts)]
    #[instruction(validator_account:Pubkey)]
    pub struct RemoveAVS<'info>{  
	/// CHECK: fee_payer requires an account info
	#[account(mut, signer)]
	pub fee_payer : AccountInfo<'info>,
        #[account(mut, seeds = [b"poolinfo"], bump)]
	pub token_pool: Account<'info,PoolInfo>,
	/// CHECK: authority requires an account info
	pub authority : AccountInfo<'info>,}

}


