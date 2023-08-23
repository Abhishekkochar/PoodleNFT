import { items } from "./mockItems";

import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { id, name } = req.body;

  if (!id || !name) {
    return res.status(400).json({ message: "Bad Request" });
  }

  const index = items.findIndex((nft) => nft.id === id);
  // If the index is not -1, the NFT exists in the array
  if (index === -1) {
    return res.status(404).json({ message: "NFT not found" });
  }

  items[index].name = name;

  return res.status(200).json({ message: "NFT updated successfully" });
};
