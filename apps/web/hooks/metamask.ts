import { useEffect, useState } from 'react';
import type { JsonRpcSigner } from 'ethers';
import { ethers } from 'ethers';

interface Metamask {
	signer: JsonRpcSigner | null;
	isConnected: boolean;
}

export function MetamaskConnect(): Metamask {
	const [isConnected, setIsConnected] = useState(false);
	const [signer, setSigner] = useState<JsonRpcSigner | null>(null);

	useEffect(() => {
		async function connectMetamask(): Promise<void> {
			try {
				if (typeof window.ethereum !== 'undefined') {
					setIsConnected(true);
					const provider = new ethers.BrowserProvider(window.ethereum);

					// Use await to correctly handle the promise
					await provider.send('eth_requestAccounts', []);
					const singers = await provider.getSigner();
					setSigner(singers);
				} else {
					setIsConnected(false);
				}
			} catch (e) {
				console.error(e);
			}
		}
		connectMetamask().catch(console.error);
	}, []);

	return { signer, isConnected };
}

// async function connect(): Promise<void> {
// 	if (typeof window.ethereum !== 'undefined') {
// 		try {
// 			setIsConnected(true);
// 			const provider = new ethers.BrowserProvider(window.ethereum);
// 			await provider.send('eth_requestAccounts', []);
// 			const singers = await provider.getSigner();
// 			setSigner(singers);
// 		} catch (e) {
// 			console.log(e);
// 		}
// 	} else {
// 		setIsConnected(false);
// 	}
// }
