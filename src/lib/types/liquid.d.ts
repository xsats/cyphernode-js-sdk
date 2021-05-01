export type Hash = string; // '0000000000000000001c6a6ae90f3f90f9a02098f5f447dc3ee09649097fa2cf'
export type BlockHash = Hash;
export type BlockHeight = number;
export type MerkleRoot = Hash;
export type TxnHash = Hash;
export type TimeStamp = number;
export type TxnHex = string;
export type TxnId = string;
export type Address = string;
export type TxnOp = string;

interface LqdBalance {
  bitcoin: number;
}

export interface LqdWalletInfo {
  walletname: string;
  walletversion: number;
  balance: LqdBalance;
  unconfirmed_balance: LqdBalance;
  immature_balance: LqdBalance;
  txcount: number;
  keypoololdest: number;
  keypoolsize: number;
  keypoolsize_hd_internal: number;
  paytxfee: number;
  hdseedid: string;
  private_keys_enabled: boolean;
}

export interface PegoutDetails {
  genesis_hash: string;
  scriptpubkey: string;
  scriptpubkey_asm: string;
  scriptpubkey_address: string;
}

export interface VOut {
  value: number;
  n: number;
  scriptPubKey: {
    asm: TxnOp;
    hex: string;
    reqSigs: number;
    type: string;
    addresses: [Address];
  };
  valuecommitment: string;
  asset: string;
  pegout: PegoutDetails;
}
export interface VIn {
  txid: string;
  vout: number;
  scriptSig: {
    asm: string;
    hex: string;
  };
}

export interface IssuanceDetails {
  asset_id: string;
  is_reissuance: boolean;
  asset_blinding_nonce: string;
  asset_entropy: number;
  contract_hash: string;
}

export interface GetTxnResult {
  txid: TxnId;
  hash: BlockHash;
  version: number;
  size: number;
  vsize: number;
  weight: number;
  locktime: number;
  vin: [VIn];
  vout: [VOut];
  hex: TxnHex;
  blockhash: BlockHash;
  confirmations: number;
  time: TimeStamp;
  blocktime: TimeStamp;
  is_pegin: boolean;
  issuance: IssuanceDetails | null;
}

export interface GetTxnError {
  code: number;
  message: string;
}

export interface GetTxnResponse {
  result: GetTxnResult | null;
  error: GetTxnError | null;
}

export interface CypherNodeLqdClient {
  getNewAddress(): Promise<String>;
  getWalletInfo(): Promise<LqdWalletInfo>;
  getTxn(txid: Hash): Promise<GetTxnResponse>;
  getBestBlockHash(): Promise<Hash>;
}

