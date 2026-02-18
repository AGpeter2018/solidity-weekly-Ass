# Assignment 2: ERC20 Implementation from Scratch

This project contains a complete, robust implementation of the ERC20 token standard written in Solidity from scratch, without the use of any external libraries (like OpenZeppelin).

## Project Overview

The core objective of this assignment was to implement the ERC20 standard manually to understand the underlying mechanics of token balances, allowances, and security considerations (like safe math and zero-address checks).

### Key Features

- **Full ERC20 Compliance**: Implements all mandatory functions: `name`, `symbol`, `decimals`, `totalSupply`, `balanceOf`, `transfer`, `transferFrom`, `approve`, and `allowance`.
- **Event Emission**: Emits standard `Transfer` and `Approval` events as required by the specification.
- **Robust Logic**:
    - **Zero Address Protection**: Prevents transfers to or from the zero address.
    - **Balance Checks**: Ensures sufficient balances before transfers.
    - **Infinite Allowance Support**: Implements the standard optimization where `type(uint256).max` allowance is not consumed by `transferFrom`.
    - **Internal Helpers**: Uses modular internal functions (`_transfer`, `_approve`, `_mint`, `_burn`) for cleaner and safer code reuse.

## Implementation Details

The implementation is located in `src/ERC20.sol`. It includes:
- `ERC20`: The base contract containing all standard logic.
- `MyToken`: An example extension that mints an initial supply to the deployer.

## Getting Started

### Prerequisites
- [Foundry](https://book.getfoundry.sh/getting-started/installation)

### Installation
```shell
# Install dependencies (if any)
forge install
```

### Build
```shell
# Compile the contracts
forge build
```

### Test
A comprehensive test suite is provided in `test/ERC20.t.sol`.
```shell
# Run the tests
forge test
```

## Testing Coverage
The tests verify:
- Initial deployment state.
- Successful `transfer` and `transferFrom`.
- Reversions on insufficient balance or allowance.
- Infinite allowance behavior.
- Event emission consistency.
