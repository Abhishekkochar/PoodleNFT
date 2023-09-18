import { ethers } from 'hardhat';
import { verify } from './verify';

//npx hardhat run --network sepolia ./scripts/deploy.ts
async function main() {
	const name = 'POODLE';
	const symbol = 'PO';
	const poodle = await ethers.deployContract('Poodle', [name, symbol]);

	await poodle.waitForDeployment();
	const poodleAddress = await poodle.getAddress();
	console.log('Contract is deployed at: ', poodleAddress);
	const owner = await ethers.getSigners();
	const stake = await ethers.deployContract('Stake', [owner[0], poodleAddress]);
	await stake.waitForDeployment();
	// When deploying to testnet, uncomment the following lines.
	// This will verify the contract
	// await verify({
	//   contractAddress: await poodle.getAddress(),
	//   args: [name, symbol],
	// });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
