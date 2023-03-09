require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const QUICKNODE = process.env.QUICKNODE;
const ETHERSCAN =  process.env.ETHERSCAN_API;


task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners();

    for (const account of accounts) {
        console.log(account.address);
    }
});

module.exports = {

  solidity: "0.8.18",

  networks: {
    sepolia: {
      url: QUICKNODE,
      accounts: [PRIVATE_KEY],
    },
  },

  etherscan: {
    apiKey: ETHERSCAN,
  },

};
