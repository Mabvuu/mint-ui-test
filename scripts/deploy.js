// scripts/deploy.js
const { ethers } = require("hardhat");

async function main() {
  // 1. Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contract with account:", deployer.address);

  // 2. Compile & deploy
  const Factory = await ethers.getContractFactory("MyContract");
  const contract = await Factory.deploy();     // start deployment

  // 3. Wait for deployment (ethers v5 style)
  await contract.deployed();

  // 4. Log the address
  console.log("Contract deployed to:", contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
