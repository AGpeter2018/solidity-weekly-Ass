# Assignment 1: Technical Questions

### 1. Where are your structs, mappings and arrays stored?
In Solidity, state variables (those declared at the contract level) are stored in **Storage**, which is a persistent area of the Ethereum Virtual Machine (EVM).

- **Structs**: When declared as state variables, their members are laid out contiguously in storage slots (32 bytes each).
- **Mappings**: They use a hash-based mechanism. The value for a key `k` is stored at a location derived from `keccak256(h(k) . p)`, where `p` is the storage slot of the mapping itself.
- **Arrays**: Fixed-size arrays are stored contiguously in storage. Dynamic arrays store their length at slot `p`, and the actual data components start at `keccak256(p)`.

### 2. How do they behave when executed or called? 
- **Mappings**: They act like a virtual "infinite" hash map. You cannot iterate over them or "get all keys" because the keys themselves are not stored, only the hash-mapped values. Accessing an uninitialized key returns the "zero value" (e.g., `0` for `uint256`, `false` for `bool`).
- **Arrays**: When you call an array, you can access elements by index. Dynamic arrays can be resized via `.push()` or `.pop()`.
- **Structs**: They allow grouping of different data types under a single name. When accessed, you reference specific members using the dot notation.

### 3. Why don't you need to specify memory or storage with mappings?
You **do not** need to specify `memory` or `storage` for mappings because **mappings can only ever exist in `storage`**.

- Solidity does not allow mappings to be created in `memory` or passed as `calldata`.
- Since there is only one possible location for a mapping type, the compiler doesn't require a data location keyword (unlike arrays or structs which can exist in either `memory` or `storage`).
