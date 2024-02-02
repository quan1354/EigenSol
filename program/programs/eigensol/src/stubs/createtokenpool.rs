#![allow(unused)]
use anchor_lang::prelude::*;
use crate::*;

pub fn createtokenpool(ctx: Context<Createtokenpool>, token:Pubkey, start_slot:u64, end_slot:u64) -> Result<()> {
    msg!("Instruction: Createtokenpool");
    let token_pool = &mut ctx.accounts.token_pool;

    token_pool.admin_address = ctx.accounts.admin.key();
    token_pool.start_slot = start_slot;
    token_pool.end_slot = end_slot;
    token_pool.token = ctx.accounts.staking_token.key();;
    token_pool.total_balance = 0;
    token_pool.staker_address = vec![];
    token_pool.avs_list = vec![];
    
    Ok(())
}
