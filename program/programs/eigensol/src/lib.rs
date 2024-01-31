#![allow(unused)]
use anchor_lang::prelude::*;
use std::str::FromStr;
pub mod stubs;
pub use stubs::*;
pub mod state;
pub use state::*;

declare_id!("GiYyM5jXdeaaJY8ixTrhKJGoP3UfwMrAeYduRSmW7VnG");

#[program]
pub mod eigensol {
    use super::*;
    
    pub fn initialize(ctx: Context<Initialize>,token_type:Vec<Pubkey>, start_slot:u64, end_slot:u64) -> Result<()> {
        stubs::initialize::initialize(ctx,token_type, start_slot, end_slot)}

    #[derive(Accounts)]
    #[instruction(token_type:Vec<Pubkey>, start_slot:u64, end_slot:u64)]
    pub struct Initialize<'info>{
	/// CHECK: fee_payer requires an account info
	#[account(mut, signer)]
	pub fee_payer : AccountInfo<'info>,
        #[account(init_if_needed, space=3528, payer=fee_payer, seeds = [b"poolinfo"], bump)]
	pub token_pool: Account<'info,PoolInfo>,
    #[account(mut)]
    pub admin: Signer<'info>, 
	/// CHECK: system_program requires an account info
	pub system_program : AccountInfo<'info>,}

    
    pub fn stake(ctx: Context<Stake>,amount:u32) -> Result<()> {
        stubs::stake::stake(ctx,amount)}

    #[derive(Accounts)]
    #[instruction(amount:u32)]
    pub struct Stake<'info>{    
	/// CHECK: fee_payer requires an account info
	#[account(mut, signer)]
	pub fee_payer : AccountInfo<'info>,
        #[account(mut, seeds = [b"poolinfo"], bump)]
	pub token_pool: Account<'info,PoolInfo>,
    pub user_info: Account<'info, UserInfo>,}


    pub fn withdraw(ctx: Context<Withdraw>,amount:u32) -> Result<()> {
        stubs::withdraw::withdraw(ctx,amount)}

    #[derive(Accounts)]
    #[instruction(amount:u32)]
    pub struct Withdraw<'info>{  
	/// CHECK: fee_payer requires an account info
	#[account(mut, signer)]
	pub fee_payer : AccountInfo<'info>,
        #[account(mut, seeds = [b"poolinfo"], bump)]
	pub token_pool: Account<'info,PoolInfo>,}


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
