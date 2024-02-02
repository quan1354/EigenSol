#![allow(unused)]
use anchor_lang::prelude::*;
use anchor_spl::token::{self, MintTo, Transfer};
use crate::*;

pub fn withdraw(ctx: Context<Withdraw>,amount:u32) -> Result<()> {
    msg!("Instruction: Withdraw");

    let user_info = &mut ctx.accounts.user_info;
    let clock = Clock::get()?;

    let reward = (clock.slot - user_info.deposit_slot);

    let cpi_accounts = MintTo {
        mint: ctx.accounts.staking_token.to_account_info(),
        to: ctx.accounts.user_staking_wallet.to_account_info(),
        authority: ctx.accounts.admin.to_account_info(),
    };
    let cpi_program = ctx.accounts.token_program.to_account_info();
    let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
    token::mint_to(cpi_ctx, reward)?;

    let cpi_accounts = Transfer {
        from: ctx.accounts.admin_staking_wallet.to_account_info(),
        to: ctx.accounts.user_staking_wallet.to_account_info(),
        authority: ctx.accounts.admin.to_account_info(),
    };
    let cpi_program = ctx.accounts.token_program.to_account_info();
    let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
    token::transfer(cpi_ctx, user_info.stake_amount)?;

    user_info.stake_amount = 0;
    user_info.deposit_slot = 0;

    Ok(())
}
