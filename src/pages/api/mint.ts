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
      console.log(phrase);

      const url = `https://robohash.org/${phrase}?set=any`;

      let metadata = null;
      const buffer = await fetch(url).then((res) => res.arrayBuffer());

      metadata = await client.store({
        name: phrase,
        description: `Robo name ${phrase}`,
        image: new File([Buffer.from(buffer)], `${ulid()}.png`, {
          type: "image/png",
        }),
        attributes: [
          {
            display_type: "date",
            trait_type: "birthday",
            value: Math.floor(Date.now() / 1000),
          },
        ],
      });
      console.log("IPFS URL for the metadata:", metadata.url);
      console.log("metadata.json contents:\n", metadata.data);
      console.log("metadata.json with IPFS gateway URLs:\n", metadata.embed());

      res.json({
        status: 200,
        message: null,
        data: metadata.url,
      });
    } catch (e: any) {
      res.json({
        status: 200,
        message: e.message,
        data: null,
      });
    }
    return;
  }
  res.status(200).send("OK");
}
