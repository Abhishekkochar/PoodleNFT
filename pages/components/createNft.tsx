import { useQuery } from "react-query";

export async function createNft(
  tokenId: number,
  userAddress: string | undefined,
  receipt: string,
) {
  const response = await fetch("/api/createNft", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tokenId: tokenId,
      userAddress: userAddress,
      receipt: receipt,
    }),
  });

  const data = await response.json();
  return data;
}
