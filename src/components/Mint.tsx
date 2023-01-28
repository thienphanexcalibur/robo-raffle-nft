import { Box, Input } from "@chakra-ui/react";
import { useSigner } from "wagmi";
import { useEffect } from "react";

const Mint = () => {
  const { data: signer } = useSigner();

  useEffect(() => {
    console.log(signer);
  }, [signer]);

  useEffect(() => {
    if (signer) {
    }
  }, []);

  return (
    <Box>
      Enter phrase
      <Input />
    </Box>
  );
};

export default Mint;
