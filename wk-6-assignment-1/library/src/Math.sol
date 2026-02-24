// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

library Math{
    function add(uint256 a, uint256 b) internal view returns (uint256) {
        return a + b;
    }

    function sub(uint256 a, uint256 b) internal view returns (uint256) {
        require(b <= a, "This is not possible");

        return a - b;
    }
}