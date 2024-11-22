# Article Contract

### Overview

The **Article** contract represents articles as ERC721 tokens, allowing users to mint and manage articles within the DApp. It supports metadata management and leverages the ERC4906 standard for metadata updates.

### Key Features

- **ERC721 Tokens**: Each article is represented as a unique ERC721 token.
- **Metadata Management**: Allows setting and updating custom fields associated with each article.
- **Access Control**: Enforces permissions, allowing only authorized users to mint and modify articles.
- **Filtering and Searching**: Supports searching for articles based on metadata filters.

### Key Functions

- `mint(address player, kv[] calldata args)`: Mints a new article token with specified metadata.
- `setData(uint256 tokenId, kv[] calldata args)`: Updates metadata fields of an existing article.
- `getNftData(uint256 tokenId, uint256[] memory keys)`: Retrieves metadata fields for a specific article.
- `grep(...)`: Searches for articles matching specified metadata filters.

### Data Structures

- **kv**: A key-value pair structure used for article metadata.
- **nftData**: Mapping storing custom metadata for each token ID and key.

### Inheritance

- Inherits from `ERC721`, `ERC721Enumerable`, `ERC721Burnable`, and implements `IERC4906` for metadata updates.

### Interactions

- Interacts with the `Profiles` contract to verify user roles and permissions.
- Can be used in conjunction with other contracts that reference articles.
