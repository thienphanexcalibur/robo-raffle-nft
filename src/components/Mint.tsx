import {
  Box,
  Button,
  Heading,
  Input,
  Spinner,
  Text,
  Image,
  VStack,
  useToast,
  TabList,
} from "@chakra-ui/react";
import { useAccount, useSigner } from "wagmi";
import { FormEvent, useState, ChangeEvent } from "react";
import NextImage from "next/image";
import { useDebounce } from "react-use";
import { Contract, ethers } from "ethers";
import { NFTV2, NFTV2__factory } from "typechain-types";

const loader = () => {
  return "/loading.svg";
};

const Mint = () => {
  const { data: signer } = useSigner();
  const { address, connector } = useAccount();

  const [value, setValue] = useState<string>("");

  const [preview, setPreview] = useState<string>("");

  const [loading, setLoading] = useState(false);
  const toast = useToast();

  useDebounce(
    () => {
      setPreview(value);
    },
    300,
    [value]
  );

  const onSubmit = async (
    e: FormEvent<HTMLDivElement> & FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data }: { data: string } = await fetch("/api/mint", {
        method: "POST",
        body: JSON.stringify({ phrase: value }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());

      const signer = await connector?.getSigner();

      const contract = new ethers.Contract(
        "0xba13b6604ccc74ba83b5ac520fb5de808a8c13b2",
        NFTV2__factory.abi,
        signer
      ) as NFTV2;

      const tx = await contract.safeMint(address as string, data);
      const receipt = await tx.wait();
      toast({
        title: "Mint success",
        description: `See transaction here: https://testnet.bscscan.com/tx/${receipt.transactionHash}`,
        status: "success",
      });
    } catch (e: any) {
      toast({
        title: "Mint error",
        description: e.message,
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <VStack as="form" onSubmit={onSubmit} alignItems="flex-start" gap={3}>
      <Box width="200px" height="200px" alignSelf="center">
        {preview ? (
          <NextImage
            alt={preview}
            width="200"
            height="200"
            src={`https://robohash.org/${preview}?set=any`}
          />
        ) : (
          <Image src="/loading.svg" />
        )}
      </Box>

      <Heading as="h1" size="xs" color="gray.700">
        Enter prompt:
      </Heading>
      <Input
        required
        disabled={loading}
        value={value}
        placeholder="Write something unique..."
        onChange={onChange}
      />
      <Button type="submit" isLoading={loading} disabled={!value}>
        Mint
      </Button>
    </VStack>
  );
};

export default Mint;
