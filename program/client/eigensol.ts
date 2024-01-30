import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import IDL from "../target/idl/eigensol.json";
import { Eigensol } from "../target/types/eigensol";
const provider = anchor.AnchorProvider.env()
export const PROGRAM_PUBKEY = new anchor.web3.PublicKey("GiYyM5jXdeaaJY8ixTrhKJGoP3UfwMrAeYduRSmW7VnG");


const getProgram = (anchorProvider: anchor.AnchorProvider = provider) => {
	return new anchor.Program<Eigensol>(IDL as any, PROGRAM_PUBKEY, provider);
};

const toPubkey = (publicKeyOrKeypair: anchor.web3.PublicKey | anchor.web3.Keypair) : anchor.web3.PublicKey => {
	return publicKeyOrKeypair instanceof anchor.web3.Keypair ? publicKeyOrKeypair.publicKey : publicKeyOrKeypair;
}


export const program = getProgram();



export interface UserInfoSeeds {
	signer : anchor.web3.Keypair | anchor.web3.PublicKey
};

export const derivePoolInfo = () : anchor.web3.PublicKey => {
	const [pubkey, bump] = anchor.web3.PublicKey.findProgramAddressSync(
		[
			Buffer.from("poolinfo")
		],
		PROGRAM_PUBKEY
	)
	return pubkey
};

export const deriveUserInfo = (
	seeds : UserInfoSeeds) : anchor.web3.PublicKey => {
	const [pubkey, bump] = anchor.web3.PublicKey.findProgramAddressSync(
		[
			Buffer.from("userinfo"),
			toPubkey(seeds.signer).toBuffer()
		],
		PROGRAM_PUBKEY
	)
	return pubkey
};

export const fetchPoolInfo = (
	address: anchor.web3.PublicKey,
) => {
	return program.account.poolInfo.fetch(address)
};
export const fetchUserInfo = (
	address: anchor.web3.PublicKey,
) => {
	return program.account.userInfo.fetch(address)
};

export async function InitializeSendAndConfirm(
	token_type : anchor.web3.PublicKey[],
	
	start_slot : anchor.BN,
	
	end_slot : anchor.BN,
	token_pool: anchor.web3.PublicKey,
	
	fee_payer : anchor.web3.PublicKey | anchor.web3.Keypair
){
	const initializeSigners = [
		fee_payer
	];

	const initializeAccountInputs = {
		tokenPool: token_pool,
		systemProgram: new anchor.web3.PublicKey("11111111111111111111111111111111"),
		feePayer: toPubkey(fee_payer),
	};

	const initializesignerKeypairs = initializeSigners.filter(
		(signer): signer is anchor.web3.Keypair => signer instanceof anchor.web3.Keypair
	);
	

	const initializeBuilder = program.methods
	.initialize(token_type,start_slot,end_slot)
	.accounts(initializeAccountInputs);
	if (initializesignerKeypairs.length > 0) {
		initializeBuilder.signers(initializesignerKeypairs);
	}
	return initializeBuilder.rpc();
}

export function Initialize(
	token_type : anchor.web3.PublicKey[],
	
	start_slot : anchor.BN,
	
	end_slot : anchor.BN,
	token_pool: anchor.web3.PublicKey,
	
	fee_payer : anchor.web3.PublicKey | anchor.web3.Keypair
){

	const initializeAccountInputs = {
		tokenPool: token_pool,
		systemProgram: new anchor.web3.PublicKey("11111111111111111111111111111111"),
		feePayer: toPubkey(fee_payer),
	};

	return program.methods
	.initialize(token_type,start_slot,end_slot)
	.accounts(initializeAccountInputs)
	.instruction();
}


export async function StakeSendAndConfirm(
	amount : number,
	token_pool: anchor.web3.PublicKey,
	
	fee_payer : anchor.web3.PublicKey | anchor.web3.Keypair
){
	const stakeSigners = [
		fee_payer
	];

	const stakeAccountInputs = {
		tokenPool: token_pool,
		feePayer: toPubkey(fee_payer),
	};

	const stakesignerKeypairs = stakeSigners.filter(
		(signer): signer is anchor.web3.Keypair => signer instanceof anchor.web3.Keypair
	);
	

	const stakeBuilder = program.methods
	.stake(amount)
	.accounts(stakeAccountInputs);
	if (stakesignerKeypairs.length > 0) {
		stakeBuilder.signers(stakesignerKeypairs);
	}
	return stakeBuilder.rpc();
}

export function Stake(
	amount : number,
	token_pool: anchor.web3.PublicKey,
	
	fee_payer : anchor.web3.PublicKey | anchor.web3.Keypair
){

	const stakeAccountInputs = {
		tokenPool: token_pool,
		feePayer: toPubkey(fee_payer),
	};

	return program.methods
	.stake(amount)
	.accounts(stakeAccountInputs)
	.instruction();
}


export async function WithdrawSendAndConfirm(
	amount : number,
	token_pool: anchor.web3.PublicKey,
	
	fee_payer : anchor.web3.PublicKey | anchor.web3.Keypair
){
	const withdrawSigners = [
		fee_payer
	];

	const withdrawAccountInputs = {
		tokenPool: token_pool,
		feePayer: toPubkey(fee_payer),
	};

	const withdrawsignerKeypairs = withdrawSigners.filter(
		(signer): signer is anchor.web3.Keypair => signer instanceof anchor.web3.Keypair
	);
	

	const withdrawBuilder = program.methods
	.withdraw(amount)
	.accounts(withdrawAccountInputs);
	if (withdrawsignerKeypairs.length > 0) {
		withdrawBuilder.signers(withdrawsignerKeypairs);
	}
	return withdrawBuilder.rpc();
}

export function Withdraw(
	amount : number,
	token_pool: anchor.web3.PublicKey,
	
	fee_payer : anchor.web3.PublicKey | anchor.web3.Keypair
){

	const withdrawAccountInputs = {
		tokenPool: token_pool,
		feePayer: toPubkey(fee_payer),
	};

	return program.methods
	.withdraw(amount)
	.accounts(withdrawAccountInputs)
	.instruction();
}


export async function AddAVSSendAndConfirm(
	validator_account : anchor.web3.PublicKey,
	token_pool: anchor.web3.PublicKey,
	authority: anchor.web3.PublicKey,
	
	fee_payer : anchor.web3.PublicKey | anchor.web3.Keypair
){
	const addAVSSigners = [
		fee_payer
	];

	const addAVSAccountInputs = {
		tokenPool: token_pool,
		authority: authority,
		feePayer: toPubkey(fee_payer),
	};

	const addAVSsignerKeypairs = addAVSSigners.filter(
		(signer): signer is anchor.web3.Keypair => signer instanceof anchor.web3.Keypair
	);
	

	const addAVSBuilder = program.methods
	.addAVS(validator_account)
	.accounts(addAVSAccountInputs);
	if (addAVSsignerKeypairs.length > 0) {
		addAVSBuilder.signers(addAVSsignerKeypairs);
	}
	return addAVSBuilder.rpc();
}

export function AddAVS(
	validator_account : anchor.web3.PublicKey,
	token_pool: anchor.web3.PublicKey,
	authority: anchor.web3.PublicKey,
	
	fee_payer : anchor.web3.PublicKey | anchor.web3.Keypair
){

	const addAVSAccountInputs = {
		tokenPool: token_pool,
		authority: authority,
		feePayer: toPubkey(fee_payer),
	};

	return program.methods
	.addAVS(validator_account)
	.accounts(addAVSAccountInputs)
	.instruction();
}


export async function RemoveAVSSendAndConfirm(
	validator_account : anchor.web3.PublicKey,
	token_pool: anchor.web3.PublicKey,
	authority: anchor.web3.PublicKey,
	
	fee_payer : anchor.web3.PublicKey | anchor.web3.Keypair
){
	const removeAVSSigners = [
		fee_payer
	];

	const removeAVSAccountInputs = {
		tokenPool: token_pool,
		authority: authority,
		feePayer: toPubkey(fee_payer),
	};

	const removeAVSsignerKeypairs = removeAVSSigners.filter(
		(signer): signer is anchor.web3.Keypair => signer instanceof anchor.web3.Keypair
	);
	

	const removeAVSBuilder = program.methods
	.removeAVS(validator_account)
	.accounts(removeAVSAccountInputs);
	if (removeAVSsignerKeypairs.length > 0) {
		removeAVSBuilder.signers(removeAVSsignerKeypairs);
	}
	return removeAVSBuilder.rpc();
}

export function RemoveAVS(
	validator_account : anchor.web3.PublicKey,
	token_pool: anchor.web3.PublicKey,
	authority: anchor.web3.PublicKey,
	
	fee_payer : anchor.web3.PublicKey | anchor.web3.Keypair
){

	const removeAVSAccountInputs = {
		tokenPool: token_pool,
		authority: authority,
		feePayer: toPubkey(fee_payer),
	};

	return program.methods
	.removeAVS(validator_account)
	.accounts(removeAVSAccountInputs)
	.instruction();
}

