import Head from "next/head";
import { useState, useEffect } from "react";
import { abi } from "../utils/abi";
import { ethers, JsonRpcSigner } from "ethers";
import { nftList } from "./components/fetchNfts";
import { createNft } from "./components/createNft";

const contractAddress = "0x84c5A705CC3616fffecAB6dba423D0A9A263605F";
const HomePage = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [hasMetamask, setHasMetamask] = useState(false);
  const [signer, setSigner] = useState<JsonRpcSigner | null>();
  const [tokenId, setTokenId] = useState(0);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setHasMetamask(true);
    }
  });

  async function connect() {
    if (typeof window.ethereum !== "undefined") {
      try {
        await ethereum.request({ method: "eth_requestAccounts" });
        setIsConnected(true);
        const provider = new ethers.BrowserProvider(window.ethereum);
        const singers = await provider.getSigner();
        setSigner(singers);
      } catch (e) {
        console.log(e);
      }
    } else {
      setIsConnected(false);
    }
  }

  async function mintNft() {
    if (typeof window.ethereum != "undefined") {
      const contract = new ethers.Contract(contractAddress, abi, signer);
      try {
        const tx = await contract.mint(signer?.address, tokenId);
        await tx.wait();
        setTokenId(tokenId + 1);
        console.log("NFT minted successfully");
        await createNft(tokenId, signer?.address, tx.hash);
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("Please install Metamask");
    }
  }

  return (
    <>
      <Head>
        <title>Poodle</title>
        <meta name="description" content="Poodle" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="p-4 bg-gray-900">
        {hasMetamask ? (
          isConnected ? (
            <div className="bg-gray-300 rounded-md p-2 inline-block">
              {" "}
              Connected with: {signer?.address}
            </div>
          ) : (
            <div className="flex justify-end">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
                onClick={() => connect()}
              >
                Connect to MetaMask
              </button>
            </div>
          )
        ) : (
          "Please install metamask"
        )}
        <div className="p-2">
          {isConnected ? (
            <div className="relative">
              <button
                className="fixed top-0 right-0 m-4 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
                onClick={() => mintNft()}
              >
                Mint Poodle
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="px-4 sm:px-0"> {nftList()}</div>
      </div>
    </>
  );
};

export default HomePage;
