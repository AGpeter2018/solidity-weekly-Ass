// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Management {

    IERC20 public Token;

    address public admin;

    constructor(address _tokenAddress) {
        Token = IERC20(_tokenAddress);
        admin = msg.sender;
    }
    
    modifier AdminOnly() {
        require(msg.sender == admin, "Admin only");
        _;
    }

    struct Property{
        string name;
        address owner;
        string location;
        bool available;
        bool paid;
        uint256 paymentTimestamp;

    }

    mapping(address => Property) public properties;

    address[] public propertyList;


    function createProperty( string memory name, address _owner, string memory _location, uint256 _fee ) external {

        require(msg.sender != address(0), "Address zero detected");

        require(bytes(name).length > 0, "Name is required");

        require(_fee > 0, "Account zero detected");

        require(Token.transferFrom(_owner, address(this), _fee), "Transaction failed");

        properties[_owner] = Property({
            name: name,
            owner: _owner,
            location: _location,
            available: true,
            paid: true,
            paymentTimestamp: block.timestamp
        });

        propertyList.push(_owner);

    }

    function getProperties() external view returns (address[] memory) {
        return propertyList;
    }

    function removeProperty(address _owner) external AdminOnly {
        delete properties[_owner];
        for(uint256 i; i < propertyList.length; i++) {
            if(propertyList[i] == _owner) {
                propertyList[i] = propertyList[propertyList.length - 1];
                propertyList.pop();
            }
        }
    }

     function buyProperty(address _owner, uint256 _fee) external {
     Property storage prop = properties[_owner];
     require(prop.available, "Property not available");
     require(Token.transferFrom(msg.sender, address(this),  _fee), "Payment failed");

      prop.owner = msg.sender;
      prop.available = false;
      prop.paid = true;
      prop.paymentTimestamp = block.timestamp;
    }


}