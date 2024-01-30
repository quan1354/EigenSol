use anchor_lang::prelude::*;
#[account]
pub struct PoolInfo {
    pub total_balance: u32,
    pub token_type: Vec<Pubkey>,
    pub start_slot: u64,
    pub end_slot: u64,
    pub staker_address: Vec<Pubkey>,
    pub avs_list: Vec<Pubkey>,
    pub admin_address: Pubkey,
}

#[account]
pub struct UserInfo {
    pub stake_amount: u32,
    pub deposit_slot: u64,
}
