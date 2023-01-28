import type { NextApiRequest, NextApiResponse } from "next";
import { NFTStorage, File } from "nft.storage";
import { ulid } from "ulid";

const NFT_STORAGE_KEY = process.env.NFT_STORAGE_KEY as string;
const client = new NFTStorage({ token: NFT_STORAGE_KEY });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { phrase } = req.body;

      const url = `https://robohash.org/${phrase}`;

      let metadata = null;
      const buffer = await fetch(url).then((res) => res.arrayBuffer());

      metadata = await client.store({
        name: phrase,
        description: `Robo name ${phrase}`,
        image: new File([Buffer.from(buffer)], `${ulid()}.png`, {
          type: "image/png",
        }),
      });
      console.log("IPFS URL for the metadata:", metadata.url);
      console.log("metadata.json contents:\n", metadata.data);
      console.log("metadata.json with IPFS gateway URLs:\n", metadata.embed());

      res.json({
        status: 200,
        message: null,
        data: metadata,
      });
    } catch (e: any) {
      res.json({
        status: 200,
        message: e.message,
        data: null,
      });
    }
  }
  res.status(200).send("OK");
}
