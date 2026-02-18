// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/ERC20.sol";

contract ERC20Test is Test {
    MyToken public token;
    address public owner = address(1);
    address public user1 = address(2);
    address public user2 = address(3);

    uint256 public constant INITIAL_SUPPLY = 1000 * 10**18;

    function setUp() public {
        vm.prank(owner);
        token = new MyToken("Test Token", "TTK", INITIAL_SUPPLY);
    }

    function test_InitialState() public {
        assertEq(token.name(), "Test Token");
        assertEq(token.symbol(), "TTK");
        assertEq(token.decimals(), 18);
        assertEq(token.totalSupply(), INITIAL_SUPPLY);
        assertEq(token.balanceOf(owner), INITIAL_SUPPLY);
    }

    function test_Transfer() public {
        uint256 amount = 100 * 10**18;
        vm.prank(owner);
        token.transfer(user1, amount);

        assertEq(token.balanceOf(owner), INITIAL_SUPPLY - amount);
        assertEq(token.balanceOf(user1), amount);
    }

    function test_TransferFail_InsufficientBalance() public {
        uint256 amount = INITIAL_SUPPLY + 1;
        vm.prank(owner);
        vm.expectRevert("ERC20: transfer amount exceeds balance");
        token.transfer(user1, amount);
    }

    function test_ApproveAndTransferFrom() public {
        uint256 amount = 100 * 10**18;
        
        vm.prank(owner);
        token.approve(user1, amount);
        assertEq(token.allowance(owner, user1), amount);

        vm.prank(user1);
        token.transferFrom(owner, user2, amount);

        assertEq(token.balanceOf(owner), INITIAL_SUPPLY - amount);
        assertEq(token.balanceOf(user2), amount);
        assertEq(token.allowance(owner, user1), 0);
    }

    function test_TransferFromFail_InsufficientAllowance() public {
        uint256 amount = 100 * 10**18;
        
        vm.prank(owner);
        token.approve(user1, amount - 1);

        vm.prank(user1);
        vm.expectRevert("ERC20: insufficient allowance");
        token.transferFrom(owner, user2, amount);
    }

    function test_InfiniteAllowance() public {
        uint256 amount = 100 * 10**18;
        
        vm.prank(owner);
        token.approve(user1, type(uint256).max);

        vm.prank(user1);
        token.transferFrom(owner, user2, amount);

        assertEq(token.allowance(owner, user1), type(uint256).max);
    }
}
