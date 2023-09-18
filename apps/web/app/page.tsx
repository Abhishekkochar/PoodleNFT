/* eslint-disable no-nested-ternary -- disabling ts- warning from L38*/
'use client';
import { useState, useEffect } from 'react';
import type { AbiCoder, InterfaceAbi, JsonRpcSigner } from 'ethers';
import { ethers } from 'ethers';
import { Container, Button } from 'ui';
import { Poodle } from 'smart-contract';

export default function Page(): JSX.Element {
	const [isConnected, setIsConnected] = useState(false);
	const [hasMetamask, setHasMetamask] = useState(false);
	const [signer, setSigner] = useState<JsonRpcSigner | null>();

	useEffect(() => {
		if (typeof window.ethereum !== 'undefined') {
			setHasMetamask(true);
		}
	}, []);

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

	async function mintNft(): Promise<void> {
		if (typeof window.ethereum !== 'undefined') {
			const poodle = new ethers.Contract(
				'contractAddress',
				Poodle.interface as InterfaceAbi,
				signer
			);
			try {
				const tx = await poodle.mintNft();
			} catch (e) {
				console.log(e);
			}
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
					{hasMetamask ? (
						isConnected ? (
							<div className="bg-gray-300 rounded-md py-2 px-2">
								Connected: {signer?.address}
							</div>
						) : (
							<Button onClick={() => connect()} text="Connect to Metamask" />
						)
					) : (
						'Please install metamask'
					)}
				</div>
			</div>
			{isConnected ? (
				<>
					<Container showGrid={false} text="Mint Poodle" />
					<Container showGrid={false} text="Stake Poodle" />
				</>
			) : null}

			<Container showGrid={isConnected} />
		</div>
	);
}
