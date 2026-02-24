// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Math} from "./Math.sol";

contract Calculator {
    
    function sum(uint256 x, uint256 y) public view returns (uint256) {
        return Math.add(x, y);
    }

    function difference(uint256 x, uint256 y) public view returns (uint256) {
        return Math.sub(x, y);
    }
}