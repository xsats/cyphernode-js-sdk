import cypherNodeHTTPTransport from "../transport/cypherNodeHttpTransport";
import { ClientConfig } from "../lib/types/clients";
import { CypherNodeLqdClient } from "../lib/types/liquid";
export const client = ({
  transport = cypherNodeHTTPTransport(),
}: ClientConfig = {}): CypherNodeLqdClient => {
  const { get, post } = transport;
  const api = {
    async getNewAddress(): Promise<String> {
      const { address } = await get("elements_getnewaddress");
      return address;
    },
  };
  return api;
};
