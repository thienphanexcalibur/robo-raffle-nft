import Head from "next/head";
import { Box, Container, Heading } from "@chakra-ui/react";
import { useAccount, useConnect, useNetwork, useSwitchNetwork } from "wagmi";
import { useEffect } from "react";

import ConnectButton from "@/components/ConnectButton";
import Mint from "@/components/Mint";
import { APP_CHAIN_ID } from "@/constants";
import ClientOnly from "@/components/ClientOnly";

export default function Home() {
  const { isConnected } = useAccount();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork({
    chainId: Number(APP_CHAIN_ID),
    throwForSwitchChainNotSupported: true,
  });
  return (
    <Box py="24px">
      <Head>
        <title>Mint Robohash</title>
        <meta name="description" content="Mint Robohash" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Heading size="md" mb="4">
          Robo NFT
        </Heading>
        <ClientOnly>
          <ConnectButton />
          {isConnected && <Mint />}
        </ClientOnly>
      </Container>
    </Box>
  );
}
