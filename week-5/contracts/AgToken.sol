// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;


Interface ERC20 {
    function name() external view returns (string memory)
    function symbol() external view returns (string memory)
    function decimals() external view returns (uint8)
    function totalSupply() external view returns (uint256)
    function balanceOf(address _owner) external view returns (uint256 balance)
    function transfer(address _to, uint256 _value) external returns (bool success)
    function transferFrom(address _from, address _to, uint256 _value) external returns (bool success)
    function approve(address _spender, uint256 _value) external returns (bool success)
    function allowance(address _owner, address _spender) external view returns (uint256 remaining)

}

contract AgToken is ERC20 {
    string private _name;
    string private _symbol;
    uint256 private _decimal;
    uint256 private _totalSupply;

    mapping(address => uint256) private _balances;

    constructor() {
        _name = "AgToken";
        _decimal = 18;
    }

    function name() public view returns (string memory) {
        return _name;
    }

    function symbol() public view returns (string memory) {
        return _decimal
    }

    function decimal() public view returns (uint256) {
        return _decimal
    }
    
    function totalSupply() public view returns (uint256 memory) {
        return _totalSupply
    }

    function balanceOf(address _owner) public view returns (uint256) {
        return balance[ _owner ]
    }

    function transfer(address _to, uint256 _value) public returns (bool) {
        require(msg.sender != address(0), "Account zero detected");

        uint256 userBalances = _balances[msg.sender];

        require(userBalances >= _value, "Blockchain Token: Insufficient fund);

        _balances[msg.sender] -= _value;
        _balances[_to] += _value

        returns true;
    }

}