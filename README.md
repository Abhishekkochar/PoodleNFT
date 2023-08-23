## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testnet Address

Contract has been deployed at Sepolia testnet at [0x84c5A705CC3616fffecAB6dba423D0A9A263605F](https://sepolia.etherscan.io/address/0x84c5A705CC3616fffecAB6dba423D0A9A263605F#readContract)

Poodle NFT.

It's a simple NFT that user can mint and transfer to other user. Poodle contract is ownable. Owner cannot mint any NFT, however can burn if desired.

Next.js framework being used for this App. There are four api calls performing CRUD operations.

`/api/createNFT` will be called once the user mint the NFT.

`/api/getNFT` will be used to fetch all minted NFT. This will return the `tokenId`, `userAddress` and `tx hash`.

`/api/updateNFT` can be called when user transfer their NFT to other users only via through the site. This still need to be implemented.

`/api/deleteNFT` can be called when owner burns the NFT by sending to address(0). This still need to be implemented.
