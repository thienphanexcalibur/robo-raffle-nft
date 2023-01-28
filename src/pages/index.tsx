import Head from "next/head";
import { Box, Container } from "@chakra-ui/react";
import { useAccount, useConnect } from "wagmi";
import { useEffect } from "react";
import { InjectedConnector } from "wagmi/connectors/injected";
import ConnectButton from "@/components/ConnectButton";
import Mint from "@/components/Mint";

export default function Home() {
  const { address } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  useEffect(() => {
    connect();
  }, []);
  return (
    <Box>
      <Head>
        <title>Mint Robohash</title>
        <meta name="description" content="Mint Robohash" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <ConnectButton />
        {address && <Mint />}
      </Container>
    </Box>
  );
}
