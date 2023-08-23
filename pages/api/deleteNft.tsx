import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "DELETE") {
    const { id } = req.query;
    try {
      const deletedNft = await prisma.nftData.delete({
        where: {
          tokenId: Number(id),
        },
      });
      res
        .status(200)
        .json({ postMessage: "Successfully deleted: ", deletedNft });
    } catch (error) {
      res.status(500).json({ error: "Error deleting NFT" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};
