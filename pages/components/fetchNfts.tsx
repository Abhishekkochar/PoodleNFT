import { useQuery } from "react-query";

async function fetchNFTItems() {
  const response = await fetch(`/api/getNft/`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export function nftList() {
  const { data, error, isLoading } = useQuery("nfts", fetchNFTItems);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {data.map((nft: any) => (
        <div key={nft.tokenId}>
          <div className="mt-6 border-t border-gray-600">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-1 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-400">
                  NFT id:
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
                  {nft.tokenId}
                </dd>
                <dt className="text-sm font-medium leading-6 text-gray-400">
                  User Address:
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
                  {nft.userAddress}
                </dd>
                <dt className="text-sm font-medium leading-6 text-gray-400">
                  Tx Hash:
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
                  {nft.receipt}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      ))}
    </div>
  );
}
