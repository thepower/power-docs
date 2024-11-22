# Chat Contract

### Overview

The **Chat** contract allows users to register messages in a chat system, storing messages and tracking message counts per chat ID. It interacts with an external storage contract (`LStore`) for data persistence.

### Key Features

- **Message Registration**: Users can post messages to specific chat IDs.
- **Message Tracking**: Keeps a count of messages per chat, allowing for tracking and retrieval.
- **External Storage Integration**: Uses the `LStore` contract for flexible data storage.

### Key Functions

- `registerMessage(uint256 id, string memory message)`: Registers a message under a specific chat ID.
- `getChatCounters(uint id)`: Retrieves the number of messages recorded for a given chat ID.

### Data Structures

- **chatCounters**: Mapping that tracks the number of messages per chat ID.
- **LStore Interface**: Interface to interact with the external storage contract, `LStore`.

### Interactions

- Communicates with the `LStore` contract to set and retrieve data based on paths.
- Allows for scalable storage solutions by delegating storage responsibilities.
