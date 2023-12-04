import "dotenv/config";
import { createPublicClient, createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { mainnet } from "viem/chains";

if (!process.env.PROVIDER_URL) {
  throw new Error("PROVIDER_URL is required");
}

if (!process.env.PRIVATE_KEY) {
  throw new Error("Private key required");
}

export const walletClient = createWalletClient({
  chain: mainnet,
  transport: http(process.env.PROVIDER_URL),
});

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(process.env.PROVIDER_URL),
});

export const account = privateKeyToAccount(
  process.env.PRIVATE_KEY as `0x${string}`
);
