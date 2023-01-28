import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { createClient, WagmiConfig } from "wagmi";
import { supportedConnectors, supportedProvider } from "@/constants";

const client = createClient({
  autoConnect: true,
  provider: supportedProvider,
  connectors: supportedConnectors,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <WagmiConfig client={client}>
        <Component {...pageProps} />
      </WagmiConfig>
    </ChakraProvider>
  );
}
