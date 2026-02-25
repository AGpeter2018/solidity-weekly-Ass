import { expect } from "chai";
import { ethers } from "hardhat";

describe("MultiSigWallet", function () {
  async function deployFixture() {
    const [owner1, owner2, owner3, recipient] =
      await ethers.getSigners();

    const MultiSig = await ethers.getContractFactory("MultiSigWallet");

    const multisig = await MultiSig.deploy(
      [owner1.address, owner2.address, owner3.address],
      2
    );

    return { multisig, owner1, owner2, owner3, recipient };
  }

  it("Should execute transaction after required approvals", async function () {
    const { multisig, owner1, owner2, recipient } =
      await deployFixture();

    // Send ETH to multisig
    await owner1.sendTransaction({
      to: multisig.target,
      value: ethers.parseEther("5"),
    });

    // Submit transaction to send 1 ETH
    await multisig
      .connect(owner1)
      .submitTransaction(recipient.address, ethers.parseEther("1"), "0x");

    // Approve by owner1
    await multisig.connect(owner1).approveTransaction(0);

    // Approve by owner2
    await multisig.connect(owner2).approveTransaction(0);

    // Execute
    await multisig.executeTransaction(0);

    expect(
      await ethers.provider.getBalance(recipient.address)
    ).to.be.gt(0);
  });
});