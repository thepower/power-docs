# Profiles Contract

### Overview

The **Profiles** contract manages user profiles, roles, and access control within the DApp. It extends the `UserProfile` contract and leverages OpenZeppelin's `AccessControl` for role management.

### Key Features

- **User Registration**: Allows users to register, creating a profile and assigning initial roles.
- **Role Management**: Defines and manages roles like `VERIFIED_USER`, `LOCKED_USER`, `EDITOR_ROLE`, etc.
- **Profile Fields**: Enables setting and retrieving custom profile fields using key-value pairs.
- **User Filtering**: Provides functions to filter and search users based on roles and profile fields.

### Key Functions

- `register()`: Allows a user to register and grants them the `REGISTERED` and `VERIFIED_USER` roles.
- `setProfileField(uint256 key, bytes calldata value)`: Users can set a specific profile field.
- `setProfileFields(kv[] calldata args)`: Users can set multiple profile fields at once.
- `getProfileData(uint256 userId, uint256[] memory keys)`: Retrieves profile data for a specific user.
- `grep(...)`: Searches for users matching specific filters, roles, and conditions.
- `setRoleAdmin(bytes32 role, bytes32 adminRole)`: Defines admin roles for managing other roles.

### Data Structures

- **kv**: A key-value pair structure used for setting and filtering profile fields.
- **userProfile**: Mapping storing user profile fields by address and key.

### Inheritance

- Inherits from `UserProfile` and OpenZeppelin's `AccessControl`.

### Interactions

- Manages user roles and permissions throughout the DApp.
- Works with other contracts that require user verification and role checks.
