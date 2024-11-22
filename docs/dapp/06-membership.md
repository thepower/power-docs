# Membership Contract

### Overview

The **Membership** contract manages membership tokens representing subscription levels within the DApp. Users can hold tokens that grant them different levels of access or benefits based on their subscription.

### Key Features

- **Subscription Levels**: Supports multiple levels of membership subscriptions.
- **Subscription Management**: Handles subscription durations and expirations for each level.
- **ERC721 Tokens**: Memberships are represented as ERC721 tokens.
- **Access Control**: Only authorized roles can mint tokens and process subscription payments.

### Key Functions

- `mint(address account)`: Mints a new membership token for a user.
- `payment_gw(uint256 tokenId, uint8 level, uint256 period)`: Processes a subscription payment, extending the subscription period.
- `token_level(uint256 tokenId)`: Retrieves the current subscription level and expiration for a specific token.
- `user_level(address account)`: Retrieves the highest subscription level and expiration across all tokens owned by a user.

### Data Structures

- **subscription**: Mapping from token ID and subscription level to expiration timestamps.
- **minter**: Mapping from token ID to the address that minted the token.

### Inheritance

- Inherits from `ERC721`, `ERC721Enumerable`, `ERC721Burnable`, and implements `IERC4906`.

### Interactions

- Uses the `Profiles` contract to verify user roles and permissions.
- Can be integrated with other contracts that require subscription-based access control.
