import { ethers } from "hardhat";
import { Poodle, Stake } from "../../typechain-types";

export async function DeployPoodle(): Promise<PoodleDeployment>{
    // Name and symbol
    const name = "POODLE";
    const symbol = "PO";
    // Signers
    const [owner, userOne, userTwo, emergencyWithdraw] = await ethers.getSigners();
    // Deploying Poodle NFT
    const Poodle = await ethers.getContractFactory("Poodle");
    const poodle = await Poodle.deploy(name, symbol);

    return { name, symbol, poodle, owner, emergencyWithdraw, userOne, userTwo };
}

export async function deployStaking(): Promise<StakeDeployment>{
    const PoodleDeployment= await DeployPoodle();
    // Deploying Stake contract
    const Stake = await ethers.getContractFactory("Stake");
    const stake = await Stake.deploy(PoodleDeployment.emergencyWithdraw.address, await PoodleDeployment.poodle.getAddress());
    return{poodleDeployment:PoodleDeployment, stake}
}

interface PoodleDeployment{
    name:string;
    symbol:string;
    poodle: Poodle;
    owner: any;
    emergencyWithdraw:any;
    userOne: any;
    userTwo: any;
}

interface StakeDeployment{
    poodleDeployment: PoodleDeployment,
    stake: Stake
}