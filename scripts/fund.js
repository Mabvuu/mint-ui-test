// scripts/fund.js
const { ethers } = require("hardhat");

async function main() {
  // use one of Hardhat’s pre-funded accounts
  const [funder] = await ethers.getSigners();

  // the address you’ve imported into MetaMask
  const target = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  // amount = 10 ETH
  const amount = ethers.utils.parseEther("10.0");

  // send the funds
  const tx = await funder.sendTransaction({
    to: target,
    value: amount
  });
  await tx.wait();

  console.log(`✅ Sent 10 ETH to ${target}.`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
