// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract Buildspace {

    uint256 totalWaves;

    constructor() {
        console.log("I am a web3 dev");
    }

    function wave() public {
        totalWaves += 1;
        console.log("%s has waved!", msg.sender);
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d waves!", totalWaves);
        return totalWaves;
    }
}
