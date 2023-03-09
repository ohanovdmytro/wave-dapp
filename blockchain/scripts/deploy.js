const hre = require("hardhat");

const main = async () => {

  const [deployer] = await hre.ethers.getSigners();
  const accountBalance = await deployer.getBalance();

  console.log("Contract deployed by: ", deployer.address);
  console.log("Address balance: ", accountBalance.toString());

  const buildspaceContractFactory = await hre.ethers.getContractFactory("Buildspace");
  const buildspaceContractDeployment = await buildspaceContractFactory.deploy();
  const buildspaceContract = await buildspaceContractDeployment.deployed();

  console.log("Contract address: ", buildspaceContract.address);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
