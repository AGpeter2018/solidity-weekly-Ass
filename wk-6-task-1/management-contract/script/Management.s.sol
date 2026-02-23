// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import {Management} from "../src/Management.sol";
import {ManagementToken} from "src/ManagementToken.sol";

contract CounterScript is Script {
    Management public ManagementIns;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        uint256 initialSupply = 1_000_000 * 10**18;

        ManagementToken token = new ManagementToken(initialSupply);



        ManagementIns = new Management(address(token));

        vm.stopBroadcast();
    }
}
