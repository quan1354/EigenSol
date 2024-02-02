#![allow(unused)]
use anchor_lang::prelude::*;
use anchor_spl::token::{self, MintTo, Transfer};
use crate::*;

pub fn stake(ctx: Context<Stake>, stake_amount:u64) -> Result<()> {
    msg!("Instruction: Stake");

    let user_info = &mut ctx.accounts.user_info;
    let clock = Clock::get()?;
    let token_pool = &mut ctx.accounts.token_pool;

    let cpi_accounts = Transfer {
        from: ctx.accounts.user_staking_wallet.to_account_info(),
        to: ctx.accounts.admin_staking_wallet.to_account_info(),
        authority: ctx.accounts.user.to_account_info(),
    };
    let cpi_program = ctx.accounts.token_program.to_account_info();
    let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
    token::transfer(cpi_ctx, stake_amount)?;

    user_info.stake_amount += stake_amount;
    user_info.deposit_slot = clock.slot;

    Ok(())
}
