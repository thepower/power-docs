# Multicall Contract

### Overview

The **Multicall** contract allows for the execution of multiple contract calls within a single transaction. This is useful for batching operations and reducing the number of transactions required for multiple actions.

### Key Features

- **Batch Execution**: Executes an array of calls to different contracts in sequence.
- **Efficiency**: Reduces gas costs by minimizing the overhead of multiple transactions.
- **Flexibility**: Supports calls to any contract address with custom calldata.

### Key Functions

- `mcall(cd[] calldata args)`: Executes multiple contract calls provided in the arguments.

### Data Structures

- **cd**: A structure representing a contract call, containing the target address and calldata.

### Usage

- Prepare an array of `cd` structs, each specifying the target contract and the calldata for the function to be executed.
- Call `mcall` with the array to execute all calls atomically.
