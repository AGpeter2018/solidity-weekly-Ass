import { time, loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { Signer } from "ethers";
import { ERC20, SaveAsset } from "../typechain-types";

describe("SaveAsset", function () {
  async function deployFixture() {
    const [owner, user1, user2]: Signer[] = await ethers.getSigners();

    const ERC20Factory = await ethers.getContractFactory("ERC20");
    const token: ERC20 = (await ERC20Factory.deploy()) as ERC20;

    // Mint token
    await token.mint(await user1.getAddress(), ethers.parseEther("1000"));
    await token.mint(await user2.getAddress(), ethers.parseEther("1000"));

    // Deploy SaveAsset contract
    const SaveAssetFactory = await ethers.getContractFactory("SaveAsset");
    const saveAsset: SaveAsset = (await SaveAssetFactory.deploy(token.target)) as SaveAsset;

    return { owner, user1, user2, token, saveAsset };
  }

  it("Should deposit ether", async function () {
    const { user1, saveAsset } = await loadFixture(deployFixture);
    await saveAsset.connect(user1).deposit({ value: ethers.parseEther("1") });

    const balance = await saveAsset.balances(await user1.getAddress());
    expect(balance).to.equal(ethers.parseEther("1"));
  });

  it("Should withdraw ether", async function () {
    const { user1, saveAsset } = await loadFixture(deployFixture);
    await saveAsset.connect(user1).deposit({ value: ethers.parseEther("1") });
    await saveAsset.connect(user1).withdraw(ethers.parseEther("1"));

    const balance = await saveAsset.balances(await user1.getAddress());
    expect(balance).to.equal(0);
  });

  it("Should deposit ERC20", async function () {
    const { user1, saveAsset, token } = await loadFixture(deployFixture);

    // Approve SaveAsset to spend user1 tokens
    await token.connect(user1).approve(saveAsset.target, ethers.parseEther("100"));

    await saveAsset.connect(user1).depositERC20(ethers.parseEther("100"));

    const balance = await saveAsset.connect(user1).getErc20SavingsBalance();
    expect(balance).to.equal(ethers.parseEther("100"));
  });
});