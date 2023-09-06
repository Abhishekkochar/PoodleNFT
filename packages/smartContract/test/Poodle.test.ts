import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { DeployPoodle } from "./utils/fixture";

describe("Poodle", function () {
  describe("Deployment", function () {
    it("Should have the right owner", async function () {
      const { poodle, owner } = await loadFixture(DeployPoodle);

      expect(await poodle.owner()).to.equal(owner.address);
    });
    it("Should have the right name", async function () {
      const { poodle, name } = await loadFixture(DeployPoodle);

      expect(await poodle.name()).to.equal(name);
    });
    it("Should have the right symbol", async function () {
      const { poodle, symbol } = await loadFixture(DeployPoodle);

      expect(await poodle.symbol()).to.equal(symbol);
    });
  });

  describe("Mint", function () {
    describe("Validations", function () {
      it("Should revert with the right error if called by owner", async function () {
        const { poodle, owner } = await loadFixture(DeployPoodle);

        await expect(
          poodle.connect(owner).mint(0),
        ).to.be.revertedWithCustomError(poodle, "OWNER_NOT_ALLOWED_TO_MINT");
      });

      it("should mint if user is not owner", async function () {
        const { poodle, userOne } = await loadFixture(DeployPoodle);
        await poodle.connect(userOne).mint(0);
        expect(await poodle.ownerOf(0)).to.be.equal(userOne.address);
      });
    });

    describe("Events", function () {
      it("Should emit an event on mint", async function () {
        const { poodle, userOne } = await loadFixture(DeployPoodle);

        await expect(poodle.connect(userOne).mint(0))
          .to.emit(poodle, "Transfer")
          .withArgs(ethers.ZeroAddress, userOne.address, 0);
      });
    });

    describe("Transfers", function () {
      it("Should transfer the funds to the other users", async function () {
        const { poodle, userOne, userTwo } = await loadFixture(
          DeployPoodle,
        );
        await poodle.connect(userOne).mint(0);
        // Transfer from userOne to userTwo
        await poodle.connect(userOne).transfer(userTwo.address, 0);
        //Checking tokenId 0 owner
        expect(await poodle.ownerOf(0)).to.be.equal(userTwo.address);
      });
    });
  });
});