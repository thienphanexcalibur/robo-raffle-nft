import { config as EnvConfig } from "dotenv";
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";

EnvConfig();

const BSC_RPC_URL = process.env.BSC_RPC_URL;

const CHAIN_ID = process.env.CHAIN_ID;

const ACCOUNT_PRIVATE = process.env.ACCOUNT_PRIVATE as string;

const ETHERSCAN_TOKEN = process.env.ETHERSCAN_TOKEN as string;

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    bscTest: {
      url: BSC_RPC_URL,
      chainId: Number(CHAIN_ID),
      accounts: [ACCOUNT_PRIVATE],
    },
  },
  etherscan: {
    apiKey: {
      bscTestnet: ETHERSCAN_TOKEN,
    },
  },
};

export default config;
