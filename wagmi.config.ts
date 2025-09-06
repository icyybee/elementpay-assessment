import { createConfig } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { http } from "viem";

export const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});
