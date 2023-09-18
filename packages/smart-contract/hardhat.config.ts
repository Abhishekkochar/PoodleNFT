import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import '@nomicfoundation/hardhat-verify';
require('dotenv').config({
	path: '.env',
});

const config: HardhatUserConfig = {
	solidity: '0.8.19',
	networks: {
		sepolia: {
			url: process.env.SEPOLIA_URL || '',
			accounts:
				process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
			gasPrice: 30000000000, // this is 30 Gwei
			chainId: 11155111,
		},
		mainnet: {
			url: process.env.MAINNET_URL || '',
			accounts:
				process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
			gasPrice: 30000000000, // this is 30 Gwei
			chainId: 1,
		},
	},
	etherscan: {
		apiKey: process.env.API_KEY,
	},
};
export default config;
