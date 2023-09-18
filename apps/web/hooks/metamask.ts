import { useState } from 'react';
import type { JsonRpcSigner } from 'ethers';
import { ethers } from 'ethers';

interface Metamask {
	signer: JsonRpcSigner | null;
	isConnected: boolean;
}

export default async function MetamaskConnect(): Promise<Metamask> {
	const [isConnected, setIsConnected] = useState(false);
	const [signer, setSigner] = useState<JsonRpcSigner | null>(null);

	if (typeof window.ethereum !== 'undefined') {
		try {
			setIsConnected(true);
			const provider = new ethers.BrowserProvider(window.ethereum);
			await provider.send('eth_requestAccounts', []);
			const singers = await provider.getSigner();
			setSigner(singers);
		} catch (e) {
			console.log(e);
		}
	} else {
		setIsConnected(false);
	}

	return { signer, isConnected };
}
