#![allow(unused)]
use anchor_lang::prelude::*;
use crate::*;

pub fn removeavs(ctx: Context<RemoveAVS>,validator_account:Pubkey) -> Result<()> {
    msg!("Instruction: Remove AVS");

    let token_pool = &mut ctx.accounts.token_pool;

    if *ctx.accounts.authority.key != token_pool.admin_address {
        return err!(ErrorCode::InvalidAuthority)
    }

    if let Some(index) = token_pool.avs_list.iter().position(|&acc| acc == validator_account) {
        token_pool.avs_list.remove(index);
    } else {
        return err!(ErrorCode::ValidatorNotFound)
    }


    Ok(())
}

#[error_code]
pub enum ErrorCode {
    #[msg("Invalid authority. Only the admin can perform this action.")]
    InvalidAuthority,
    
    #[msg("Validator not found in the AVS list.")]
    ValidatorNotFound
}
