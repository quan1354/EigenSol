#![allow(unused)]
use anchor_lang::prelude::*;
use crate::*;

pub fn addavs(ctx: Context<AddAVS>,validator_account:Pubkey) -> Result<()> {
    msg!("Instruction: Add AVS");

    let token_pool = &mut ctx.accounts.token_pool;

    if *ctx.accounts.authority.key != token_pool.admin_address {
        return err!(ErrorCode::InvalidAuthority)
    }

    if !token_pool.avs_list.contains(&validator_account) {
        token_pool.avs_list.push(validator_account);
    } else {
        return err!(ErrorCode::ValidatorAlreadyExists)
    }

    Ok(())
}

#[error_code]
pub enum ErrorCode {
    #[msg("Invalid authority. Only the admin can perform this action.")]
    InvalidAuthority,
    
    #[msg("Validator already exists in the AVS list.")]
    ValidatorAlreadyExists
}

