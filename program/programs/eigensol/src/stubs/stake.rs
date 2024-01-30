#![allow(unused)]
use anchor_lang::prelude::*;
use crate::*;

pub fn stake(ctx: Context<Stake>, amount:u32) -> Result<()> {
    msg!("Instruction: Stake");

    let user_info = &mut ctx.accounts.user_info;
    let clock = Clock::get()?;
    let token_pool = &mut ctx.accounts.token_pool;
    Ok(())
}
