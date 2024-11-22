# Index Articles2 Contract

### Overview

The **IndexArticles2** contract indexes articles from other ERC721 contracts. It allows for the creation of tokens that reference original articles, copying over selected metadata fields.

### Key Features

- **Indexing External Articles**: References and indexes articles from external ERC721 contracts.
- **Metadata Synchronization**: Copies and updates selected metadata fields from the original articles.
- **ERC721 Tokens**: Indexed articles are represented as ERC721 tokens in this contract.

### Key Functions

- `mint(uint256 newToken, address originERC721, uint256 rTokenId, uint256[] calldata keys)`: Mints a new token that indexes an external article.
- `getNftData(uint256 tokenId, uint256[] memory keys)`: Retrieves metadata fields for a specific indexed article.
- `grep(...)`: Searches for indexed articles matching specified metadata filters.

### Data Structures

- **kv**: Key-value pairs for metadata fields.
- **nftData**: Mapping for storing metadata of indexed articles.

### Inheritance

- Inherits from `ERC721`, `ERC721Enumerable`, `ERC721Burnable`, and implements `IERC4906`.

### Interactions

- Interacts with external `Article` contracts to access original article data.
- Relies on the `Profiles` contract for access control and role verification.
