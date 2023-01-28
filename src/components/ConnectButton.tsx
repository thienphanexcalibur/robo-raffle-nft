import { Box, Button, Text } from "@chakra-ui/react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

const ConnectButton = () => {
  const { address, isConnected } = useAccount();

  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  if (isConnected)
    return (
      <Box>
        <Text>Connected to {address}</Text>
        <Button onClick={() => disconnect()}>Disconnect</Button>
      </Box>
    );
  return (
    <Box>
      <Button onClick={() => connect()}>Connect Wallet</Button>
    </Box>
  );
};

export default ConnectButton;
