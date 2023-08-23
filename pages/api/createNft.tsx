import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const newItem = await prisma.nftData.create({
        data: {
          tokenId: req.body.tokenId,
          userAddress: req.body.userAddress,
          receipt: req.body.receipt,
        },
      });
      res.status(201).json(newItem);
    } catch (error) {
      res.status(500).json({ error: "Error creating NFT" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};
