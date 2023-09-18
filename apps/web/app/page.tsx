'use client';
import { useState } from 'react';
import type { JsonRpcSigner } from 'ethers';
import { ethers } from 'ethers';
import { Container, Button } from 'ui';
import mintNft from '../hooks/mint-nft';
import stakeNft from '../hooks/mint-nft';

export default function Page(): JSX.Element {
	const [isConnected, setIsConnected] = useState(false);

	const [signer, setSigner] = useState<JsonRpcSigner | undefined>();

	async function connect(): Promise<void> {
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
	}

	return (
		<div
			className=" min-h-screen max-h-full w-full bg-gradient-to-r from-blue-200 via-purple-400 to-blue-800"
			id="home"
			title="Poodle"
		>
			<div className="p-2">
				<div className="flex justify-between">
					<div className="text-black font-medium py-2 px-4 rounded">
						Poodle NFT
					</div>
					{isConnected ? (
						<div className="bg-gray-300 rounded-md py-2 px-2">
							Connected: {signer?.address}
						</div>
					) : (
						<Button onClick={() => connect()} text="Connect to Metamask" />
					)}
				</div>
			</div>
			{isConnected ? (
				<>
					<Container
						onClick={() => mintNft(signer)}
						showGrid={false}
						text="Mint Poodle"
					/>
					<Container
						onClick={() => stakeNft(signer)}
						showGrid={false}
						text="Stake Poodle"
					/>
				</>
			) : null}

			<Container showGrid={isConnected} />
		</div>
	);
}
