import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const address = req.query;
      const nfts = await prisma.nftData.findMany();
      res.status(200).json(nfts);
    } catch (error) {
      res.status(500).json({ error: "Error fetching NFTs" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};
