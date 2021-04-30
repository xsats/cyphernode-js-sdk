import cypherNodeHTTPTransport from "../transport/cypherNodeHttpTransport";
import { ClientConfig } from "../lib/types/clients";
import { CypherNodeLqdClient, LqdWalletInfo, Hash, TxnInfo } from "../lib/types/liquid";
export const client = ({
  transport = cypherNodeHTTPTransport(),
}: ClientConfig = {}): CypherNodeLqdClient => {
  const { get, post } = transport;
  const api = {
    async getNewAddress(): Promise<String> {
      const { address } = await get("elements_getnewaddress");
      return address;
    },
    getWalletInfo(): Promise<LqdWalletInfo> {
      return get("elements_getnewaddress");
    },
    async getTxn(txnHash: Hash): Promise<TxnInfo> {
      const { result: txnInfo } = await get("elements_gettransaction", txnHash);
      return txnInfo;
    },
  };
  return api;
};
