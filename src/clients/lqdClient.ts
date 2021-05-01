import cypherNodeHTTPTransport from "../transport/cypherNodeHttpTransport";
import { ClientConfig } from "../lib/types/clients";
import {
  CypherNodeLqdClient,
  LqdWalletInfo,
  Hash,
  GetTxnResponse,
} from "../lib/types/liquid";
export const client = ({
  transport = cypherNodeHTTPTransport(),
}: ClientConfig = {}): CypherNodeLqdClient => {
  const { get, post } = transport;
  const api = {
    async getNewAddress(): Promise<string> {
      const { address } = await get("elements_getnewaddress");
      return address;
    },
    getWalletInfo(): Promise<LqdWalletInfo> {
      return get("elements_getwalletinfo");
    },
    async getTxn(txid: Hash): Promise<GetTxnResponse> {
      const { result } = await get("elements_gettransaction", txid);
      return result;
    },
    async getBestBlockHash(): Promise<string> {
      const { hash } = await get("elements_getbestblockhash");
      return hash;
    },
  };
  return api;
};

