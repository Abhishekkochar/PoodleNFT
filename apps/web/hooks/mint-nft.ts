/* eslint-disable camelcase  -- 'Poodle__factory' is auto generated*/
import { ethers } from 'ethers';
import { Poodle__factory } from 'smart-contract';
import type { JsonRpcSigner } from 'ethers';

export default async function mintNft(
	signer: JsonRpcSigner | undefined
): Promise<void> {
	if (typeof window.ethereum !== 'undefined') {
		try {
			const poodle = new ethers.Contract(
				'0xe7f1725e7734ce288f8367e1bb143e90bb3f0512',
				// eslint-disable-next-line camelcase, @typescript-eslint/no-unsafe-argument -- Autogenerated name
				Poodle__factory.abi,
				signer
			);
			const tx = await poodle.mint(1);
			await tx.wait();
			console.log('Successfully minted');
		} catch (e) {
			console.log(e);
		}
	}
}
