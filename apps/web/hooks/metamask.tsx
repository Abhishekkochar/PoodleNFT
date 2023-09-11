
// import { useState, useEffect } from "react";
// import { JsonRpcSigner, ethers } from "ethers";

// export function Metamask(){
//     const [wallet, setWallet] = useState<JsonRpcSigner | null>(null)
//     const [address, setAddress] = useState(String)

//     useEffect(()=>{
//         async function connectMetamask(){
//             if(typeof window.ethereum !== "undefined"){
//                 if ( typeof window.ethereum !== "undefined") {
//                     const provider = new ethers.BrowserProvider(window.ethereum);
//                     await provider.send('eth_requestAccounts', []);
//                     const signer = await provider.getSigner();
//                     setWallet(signer);
//                     const userAddress = await signer.getAddress();
//                     setAddress(userAddress);
//                   } else {
//                     console.error("MetaMask not detected.");
//                   }
//                 }
//         }
//     })
// }