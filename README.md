# Solidity Weekly Assignments

This repository contains a collection of weekly assignments focused on Solidity development, Ethereum Virtual Machine (EVM) theory, and smart contract frameworks like **Foundry** and **Hardhat**.

## 📂 Repository Structure

### 1. [Assignment 1: Technical Questions](file:///c:/Users/HomePC/Desktop/solidity-weekly-ass/assignment-1/README.md)
A theoretical deep dive into Solidity's internals. It covers:
- Data locations (**Storage**, **Memory**, **Calldata**).
- Storage layout for **Structs**, **Mappings**, and **Arrays**.
- EVM behavior and initialization of complex data types.

### 2. [Assignment 2: Counter & ERC-20](file:///c:/Users/HomePC/Desktop/solidity-weekly-ass/assignment-2/ass-2/README.md)
A hands-on project using the **Foundry** development toolchain.
- **ERC-20 Implementation**: A standard-compliant token implementation.
- **Counter Contract**: A simple state-management contract.
- Includes tests and deployment scripts using Foundry's `forge` and `cast`.

### 3. [Week 5: Todo & Lock Contracts](file:///c:/Users/HomePC/Desktop/solidity-weekly-ass/week-5/README.md)
A comprehensive assignment built with the **Hardhat** framework.
- **Todo.sol**: A task management smart contract.
- **AgToken.sol**: A custom ERC-20 token implementation.
- **Lock.sol**: A sample contract demonstrating time-locked funds.
- **Environment**: Configured with Hardhat Ignition for automated deployments and TypeScript for testing.

## 🛠️ Tools & Technologies

- **Solidity**: Smart contract programming language.
- **Foundry**: Fast toolkit for Ethereum application development (Assignment 2).
- **Hardhat**: Development environment for Ethereum software (Week 5).
- **TypeScript**: Used for writing robust tests and deployment scripts.

## 🚀 Getting Started

To explore a specific assignment, navigate to its respective directory:

```bash
# To check theoretical questions
cd assignment-1

# To run Foundry tests (Assignment 2)
cd assignment-2/ass-2
forge test

# To run Hardhat tests (Week 5)
cd week-5
npx hardhat test
```
