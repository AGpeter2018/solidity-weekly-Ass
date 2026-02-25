import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre, { ethers } from "hardhat";

// describe("SaveAsset", function () {
//   // We define a fixture to reuse the same setup in every test.
//   // We use loadFixture to run this setup once, snapshot that state,
//   // and reset Hardhat Network to that snapshot in every test.
//   async function deployOneYearLockFixture() {
//     const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
//     const ONE_GWEI = 1_000_000_000;

//     const lockedAmount = ONE_GWEI;
//     const unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;

//     let Token, token, SaveAsset, saveAsset;
//     let owner, user1, user2;

//     // Contracts are deployed using the first signer/account by default

//     beforeEach(async function() {
//       [owner, user1, user2] = await hre.ethers.getSigners();
//     })

//     Token = await ethers.getContractFactory("ERC20");

//     token = await Token.deploy();

//     await token.waitForDeployment();

//     await token.mint(user1.address, ethers.parseEther("1000"));

//     await token.mint(user2.address, ethers.parseEther("1000"));

//     // Deploy SaveAsset contract

//     SaveAsset = await ethers.getContractFactory("SaveAsset");

//     saveAsset = await SaveAsset.deploy(token.target);

//     await saveAsset.waitForDeployment();

//     it("Should deposit ether", async function() {
//       await saveAsset.connect(user1).deposit({
//         value:ethers.parseEther("1")
//       });

//       const balannce = await saveAsset.balances(user1.address);

//       expect(balannce).to.equal(ethers.parseEther("1")),

//       saveAsset.connect(user1).withdraw(ethers.parseEther("1"))
      
//       it("Should withdraw ether", async function() {
//         await saveAsset.connect(user1).withdraw(ethers.parseEther("1"))
//       })
//     })


//   }
// });



import { Signer } from "ethers";
import { ERC20, SaveAsset } from "../typechain-types";

describe("SaveAsset", function () {
  let token: ERC20;
  let saveAsset: SaveAsset;

  let owner: Signer;
  let user1: Signer;
  let user2: Signer;

  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners();

    const TokenFactory = await ethers.getContractFactory("ERC20");
    token = await TokenFactory.deploy();
    await token.waitForDeployment();

    // Mint tokens
    await token.mint(
      await user1.getAddress(),
      ethers.parseEther("1000")
    );

    await token.mint(
      await user2.getAddress(),
      ethers.parseEther("1000")
    );

    const SaveAssetFactory =
      await ethers.getContractFactory("SaveAsset");

    saveAsset = await SaveAssetFactory.deploy(
      token.target
    );

    await saveAsset.waitForDeployment();
  });

  it("Should deposit ETH", async function () {
    await saveAsset
      .connect(user1)
      .deposit({ value: ethers.parseEther("1") });

    const balance = await saveAsset.balances(
      await user1.getAddress()
    );

    expect(balance).to.equal(ethers.parseEther("1"));
  });

  it("Should withdraw ETH", async function () {
    await saveAsset
      .connect(user1)
      .deposit({ value: ethers.parseEther("1") });

    await saveAsset
      .connect(user1)
      .withdraw(ethers.parseEther("1"));

    const balance = await saveAsset.balances(
      await user1.getAddress()
    );

    expect(balance).to.equal(0);
  });

  it("Should deposit ERC20", async function () {
    const amount = ethers.parseEther("300");

    await token
      .connect(user1)
      .approve(saveAsset.target, amount);

    await saveAsset
      .connect(user1)
      .depositERC20(amount);

    const saved = await saveAsset
  .connect(user1)
  .getErc20SavingsBalance();

    expect(saved).to.equal(amount);
  });

  it("Should revert when withdrawing more than saved", async function () {
    await expect(
      saveAsset
        .connect(user1)
        .withdraw(ethers.parseEther("1"))
    ).to.be.revertedWith("Insufficient funds");
  });
});