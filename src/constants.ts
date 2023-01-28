import { InjectedConnector } from "wagmi/connectors/injected";
import { publicProvider } from "@wagmi/core/providers/public";
import { configureChains } from "wagmi";
import { bsc, bscTestnet } from "wagmi/chains";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import sample from "lodash/sample";

export const APP_CHAIN_ID = process.env.CHAIN_ID as string;

export const getHTTPRPC = () => {
  switch (Number(APP_CHAIN_ID)) {
    case bscTestnet.id:
      return sample([
        "https://data-seed-prebsc-1-s2.binance.org:8545",
        "https://data-seed-prebsc-2-s3.binance.org:8545",
        "https://data-seed-prebsc-1-s3.binance.org:8545",
      ]) as string;
    default:
      return "";
  }
};

const { chains, provider } = configureChains([bscTestnet], [publicProvider()]);

export const supportedConnectors = [new MetaMaskConnector({ chains })];

export const supportedChains = chains;
export const supportedProvider = provider;
