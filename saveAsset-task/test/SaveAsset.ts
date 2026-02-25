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

  it("Should be contract name", async function() {
    const {token} = await loadFixture(deployFixture);

    const contractName = await token.name();

    expect(contractName).to.equal("WEB3CXIV")
  })

  it("Should be symbol", async function() {
    const {token} = await loadFixture(deployFixture);

    const tokenSymbol = await token.symbol();

    expect(tokenSymbol).to.equal("CXIV");
  })

  it("Should be decimal", async function() {
    const {token} = await loadFixture(deployFixture);

    const tokenSymbol = await token.decimals();

    expect(tokenSymbol).to.equal("18");
  })

  it("Should be totalSupply", async function() {
    const {token} = await loadFixture(deployFixture);

    const tokenSymbol = await token.totalSupply();

    expect(tokenSymbol).to.equal(ethers.parseEther("2000"));
  })

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

  it("Should withdraw ERC20", async function() {
    const { saveAsset, user1, token } = await loadFixture(deployFixture);

    await token.connect(user1).approve(saveAsset.target, ethers.parseEther("1"));

    await saveAsset.connect(user1).depositERC20(ethers.parseEther("1"))

    await saveAsset.connect(user1).withdrawERC20(ethers.parseEther("1"));

    const balance = await saveAsset.connect(user1).getErc20SavingsBalance();

    expect(balance).to.equal(ethers.parseEther("0"));
  })

  it("Should show owner balance", async function() {
    const {token, user1} = await loadFixture(deployFixture);

    const ownerBalance = await token.balanceOf(user1);

    expect(ownerBalance).to.equal(ethers.parseEther("1000"));
  })

  it("Should transfer Ether", async function() {
    const {user1, token, saveAsset} = await loadFixture(deployFixture);

    await token.connect(user1).transfer(saveAsset.target, ethers.parseEther("100"));

    const balance = await saveAsset.connect(user1).getErc20SavingsBalance();

    expect(balance).to.equal(ethers.parseEther("0"));
  })

  it("should approve spender", async function() {
    const {token, user1, saveAsset} = await loadFixture(deployFixture);

    await token.connect(user1).approve(saveAsset.target, ethers.parseEther("100"));

    const balance = await saveAsset.connect(user1).getContractBalance();

    expect(balance).to.equal(ethers.parseEther("0"))
  })
});