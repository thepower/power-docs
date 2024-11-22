# Sponsor Contract

### Overview

The **Sponsor** contract provides functionality to sponsor transactions within the network and manage sponsorship permissions. It implements the ERC165 standard for interface detection and allows for granular permission management through mappings.

### Key Features

- **Sponsorship Verification**: Determines whether a transaction can be sponsored based on predefined criteria and permissions.
- **Permission Management**: Grants or revokes permissions to addresses, including admin permissions.
- **Interface Support**: Supports multiple interfaces recognized by ERC165.

### Key Functions

- `areYouSponsor()`: Checks if the contract acts as a sponsor and returns sponsorship status along with sponsor key and amount.
- `sponsor_tx(...)`: Evaluates a transaction to determine if it can be sponsored using the new interface.
- `wouldYouLikeToPayTx(...)`: Evaluates a transaction under the old interface to determine sponsorship willingness.
- `allowAdmin(address to)`: Grants admin permission to an address.
- `allow(address to, uint32 add, uint32 del)`: Grants or revokes specific permissions for an address.
- `supportsInterface(bytes4 interfaceId)`: Checks if the contract supports a specific interface.

### Data Structures

- **tpTx**: Represents a transaction with fields like kind, from, to, sequence number, call data, payloads, and signatures.
- **tpTx1**: An older version of the transaction structure.
- **tpPayload**: Represents a transaction payload with purpose, currency, and amount.
- **tpSig**: Represents a signature with raw data, timestamp, public key, and signature bytes.

### Inheritance

- Inherits from `ERC165` for interface detection.

### Interactions

- Interacts with the `GetTx` contract to retrieve transaction data.
- Uses the `allowed` mapping to manage permissions for addresses.
