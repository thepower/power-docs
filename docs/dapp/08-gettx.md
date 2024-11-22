# GetTx Contract

### Overview

The **GetTx** contract provides structures and functions for accessing transaction data within the DApp. It defines transaction-related structures and methods for retrieving transaction details, extra data, and signers.

### Key Features

- **Transaction Data Access**: Retrieves current transaction data and extra information associated with it.
- **Signature Handling**: Provides access to transaction signatures and signer information.
- **Data Structures**: Defines standardized structures for transactions, payloads, and signatures.

### Key Functions

- `getTx()`: Retrieves the current transaction data as a `tpTx` structure.
- `getExtra(string calldata keyname)`: Retrieves extra data associated with the transaction by key name.
- `getSigners()`: Returns an array of signers' data for the transaction.

### Data Structures

- **tpTx**: Represents a transaction with fields like kind, from, to, timestamp, sequence, call data, payloads, and signatures.
- **tpPayload**: Represents additional data associated with a transaction, such as purpose, currency, and amount.
- **tpSig**: Represents a transaction signature, including raw data, timestamp, public key, and signature bytes.

### Usage

- Other contracts can inherit from or interact with `GetTx` to access transaction-level data and signatures.
- Useful for contracts that need to validate or process transactions based on their metadata.
