import {
  Box,
  Button,
  HStack,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useAccount, useConnect, useDisconnect, useNetwork } from "wagmi";

const ConnectButton = () => {
  const { address, isConnected = true } = useAccount();

  const [showConnectors, setShowConnectors] = useState(false);

  const { chain } = useNetwork();

  const { connect, pendingConnector, connectors, isLoading, error } =
    useConnect();

  const { disconnect } = useDisconnect();

  if (isConnected && address)
    return (
      <HStack spacing={4} wrap="wrap">
        <VStack alignItems="flex-start">
          <Text color="gray">{address}</Text>
          <Text fontSize="sm" color="gray.500" fontWeight={500}>
            Network: {chain?.name}
          </Text>
          <Text fontSize="sm" color="gray.500" fontWeight={500}>
            Chain ID: {chain?.id}
          </Text>
        </VStack>
        <Button
          alignSelf="flex-start"
          onClick={() => disconnect()}
          colorScheme="red"
          variant="outline"
        >
          Disconnect
        </Button>
      </HStack>
    );

  return (
    <>
      <Box>
        <Button onClick={() => setShowConnectors(true)}>Connect Wallet</Button>
      </Box>
      <Modal isOpen={showConnectors} onClose={() => setShowConnectors(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Choose a Wallet</ModalHeader>
          <ModalCloseButton />
          <VStack>
            {connectors.map((connector) => (
              <Button
                isLoading={isLoading && pendingConnector?.id === connector.id}
                loadingText="Connecting..."
                isDisabled={!connector.ready}
                key={connector.id}
                onClick={() => connect({ connector })}
              >
                {connector.name}
              </Button>
            ))}
          </VStack>
        </ModalContent>
        <ModalFooter>
          {error && (
            <Text as="span" color="red">
              {error.message}
            </Text>
          )}
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ConnectButton;
