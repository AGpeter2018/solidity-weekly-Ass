// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;


import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SchoolToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("AgToken", "AGT") {
        _mint(msg.sender, initialSupply);
    }
}