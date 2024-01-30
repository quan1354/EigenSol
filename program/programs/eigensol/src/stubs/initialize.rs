#![allow(unused)]
use anchor_lang::prelude::*;
use crate::*;

pub fn initialize(ctx: Context<Initialize>, token_type:Vec<Pubkey>, start_slot:u64, end_slot:u64) -> Result<()> {
    msg!("Instruction: Initialize");
    let token_pool = &mut ctx.accounts.token_pool;

    token_pool.admin_address = ctx.accounts.admin.key();
    token_pool.start_slot = start_slot;
    token_pool.end_slot = end_slot;
    token_pool.token_type = token_type;
    token_pool.total_balance = 0;
    token_pool.staker_address = vec![];
    token_pool.avs_list = vec![];
    
    Ok(())
}
