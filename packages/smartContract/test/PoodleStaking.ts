import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { deployStaking } from "./utils/fixture";
import { ethers } from "hardhat";

// Staking contract name and version
const name = 'Poodle Staking'
const version = 1
describe('Staking', ()=>{
    describe('Deployment', ()=>{

        it('Should have the right name', async()=>{
            const {stake} = await loadFixture(deployStaking)
            expect(await stake.NAME()).to.be.equal(name)
        })

        it('Should have the right version', async()=>{
            const {stake} = await loadFixture(deployStaking)
            expect(await stake.VERSION()).to.be.equal(version)
        })

        it('Should have the right Withdraw', async()=>{
            const {stake} = await loadFixture(deployStaking)
            expect(await stake.VERSION()).to.be.equal(version)
        })

        it('Should have the right WITHDRAW_ROLE', async()=>{
            const {stake, poodleDeployment} = await loadFixture(deployStaking)
            const role = await stake.WITHDRAW_ROLE();
            expect(await stake.hasRole(role, poodleDeployment.emergencyWithdraw.address)).to.be.equal(true)
        })

    })
    describe('Staking', ()=>{

        it('Should successfully stake Poodle nft', async()=>{
            const {poodleDeployment, stake} = await loadFixture(deployStaking)
            const {poodle, userOne} = poodleDeployment
            // Minting NFT
            await poodle.connect(userOne).mint(0)
            // userOne should have tokenId `0`
            expect(await poodle.ownerOf(0)).to.be.equal(userOne.address)
            // Staking NFT
            // Approve function first
            await poodle.connect(userOne).approve(await stake.getAddress(), 0)
            // Staking, Checking for staking events
            await expect(stake.connect(userOne).stakeNft(0)).to.emit(stake, "STAKE").withArgs(userOne.address, 0)
            // Checking the owner of tokenId 0, should be userOne
            expect(await stake.ownerOf(0)).to.be.equal(userOne.address)
            // tokenId 0 should be owned by staking contract
            expect(await poodle.ownerOf(0)).to.be.equal(await stake.getAddress())
        })

        it('Should successfully revert if the Poodle nft is not valid', async()=>{
            const {stake} = await loadFixture(deployStaking)
            // Staking, Checking for staking events
            await expect(stake.stakeNft(0)).to.rejectedWith('ERC721: invalid token ID')
        })
    })

    describe('UnStaking', ()=>{

        it('Should successfully unStake Poodle nft', async()=>{
            const {poodleDeployment, stake} = await loadFixture(deployStaking)
            const {poodle, userOne, userTwo} = poodleDeployment
            // Minting NFT
            await poodle.connect(userOne).mint(0)
            // userOne should have tokenId `0`
            expect(await poodle.ownerOf(0)).to.be.equal(userOne.address)
            // Staking NFT
            // Approve function first
            await poodle.connect(userOne).approve(await stake.getAddress(), 0)
            // Staking
            await stake.connect(userOne).stakeNft(0)
            // After staking tokenId 0 owner should not be userOne
            expect(await poodle.ownerOf(0)).to.be.equal(await stake.getAddress())
            // UnStaking NFT
            // Should revert if the msg.sender is other than userOne(Staked account)
            await expect(stake.connect(userTwo).unStakeNft(0)).to.be.revertedWithCustomError(stake, 'NOT_AUTHORIZED')
            // UnStaking from userOne
            await expect(stake.connect(userOne).unStakeNft(0)).to.be.emit(stake, "UNSTAKE").withArgs(userOne.address, 0)
            // After unStaking tokenId 0 owner should be userOne
            expect(await poodle.ownerOf(0)).to.be.equal(userOne.address)
        })

        it('Should successfully unStake multiple nfts only by address with the role `WITHDRAW_ROLE`', async()=>{
            const {poodleDeployment, stake} = await loadFixture(deployStaking)
            const {poodle, userOne, userTwo, emergencyWithdraw} = poodleDeployment
            // Minting NFT
            await poodle.connect(userOne).mint(0)
            await poodle.connect(userTwo).mint(1)
            // Staking NFT
            // Approve function first
            await poodle.connect(userOne).approve(await stake.getAddress(), 0)
            await poodle.connect(userTwo).approve(await stake.getAddress(), 1)
            // Staking
            await stake.connect(userOne).stakeNft(0)
            await stake.connect(userTwo).stakeNft(1)
            // Calling emergency unStake button from userOne. This should revert.
            await expect (stake.connect(userOne).forcedUnStake([0,1])).to.be.reverted
            // Calling emergency unStake button
            await expect(stake.connect(emergencyWithdraw).forcedUnStake([0,1])).to.be.emit(stake, 'EMERGENCYUNSTAKE').withArgs(emergencyWithdraw.address, [0,1])
        })

    })
})