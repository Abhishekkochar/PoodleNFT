/* eslint-disable no-nested-ternary */
"use client"
import { useState, useEffect } from "react";
import type { JsonRpcSigner } from "ethers";
import { ethers } from "ethers";


export default function Page(): JSX.Element {
  const [isConnected, setIsConnected] = useState(false);
  const [hasMetamask, setHasMetamask] = useState(false);
  const [signer, setSigner] = useState<JsonRpcSigner | null>();

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setHasMetamask(true);
    }
  }, []);

  async function connect() {
    if (typeof window.ethereum !== "undefined") {
      try {
        setIsConnected(true);
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send('eth_requestAccounts', [])
        const singers = await provider.getSigner();
        setSigner(singers);
      } catch (e) {
        console.log(e);
      }
    } else {
      setIsConnected(false);
    }
  }

  return (
      <div className="h-screen w-full bg-[#122ac38c]" id="home" title="Poodle">
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
                  className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded" type="button"
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
                className="fixed top-0 right-0 m-4 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded" type="button"
              >
                Mint Poodle
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      </div>
  );
}
