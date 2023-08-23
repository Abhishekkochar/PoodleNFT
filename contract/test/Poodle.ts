import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Poodle", function () {
  const name = "POODLE";
  const symbol = "PO";
  async function deployOneYearLockFixture() {
    const [owner, userOne, userTwo] = await ethers.getSigners();

    const Poodle = await ethers.getContractFactory("Poodle");
    const poodle = await Poodle.deploy(name, symbol);

    return { poodle, owner, userOne, userTwo };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { poodle, owner } = await loadFixture(deployOneYearLockFixture);

      expect(await poodle.owner()).to.equal(owner.address);
    });
  });

  describe("Mint", function () {
    describe("Validations", function () {
      it("Should revert with the right error if called by owner", async function () {
        const { poodle, owner } = await loadFixture(deployOneYearLockFixture);

        await expect(
          poodle.connect(owner).mint(owner.address, 0),
        ).to.be.revertedWithCustomError(poodle, "OWNER_NOT_ALLOWED_TO_MINT");
      });

      it("should mint if user is not owner", async function () {
        const { poodle, userOne } = await loadFixture(deployOneYearLockFixture);
        await poodle.connect(userOne).mint(userOne.address, 0);
        expect(await poodle.ownerOf(0)).to.be.equal(userOne.address);
      });
    });

    describe("Events", function () {
      it("Should emit an event on mint", async function () {
        const { poodle, userOne } = await loadFixture(deployOneYearLockFixture);

        await expect(poodle.connect(userOne).mint(userOne.address, 0))
          .to.emit(poodle, "Transfer")
          .withArgs(ethers.ZeroAddress, userOne.address, 0);
      });
    });

    describe("Transfers", function () {
      it("Should transfer the funds to the other users", async function () {
        const { poodle, userOne, userTwo } = await loadFixture(
          deployOneYearLockFixture,
        );

        await poodle.connect(userOne).mint(userOne.address, 0);
        // Transfer from userOne to userTwo
        await poodle.connect(userOne).transfer(userTwo.address, 0);
        //Checking tokenId 0 owner
        expect(await poodle.ownerOf(0)).to.be.equal(userTwo.address);
      });
    });
  });
});
