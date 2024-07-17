# The tpe CLI

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Introduction](#introduction)
- [`tpe` usage](#tpe-usage)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Introduction

The tpe CLI (Command Line Interface) is a tool that has a goal of facilitation the management and deployment of decentralized applications and services.

## `tpe` usage

There is how you may utilize the `tpe` CLI:

1. **Account Management:**

   - **tpe acc get-balance:** Retrieve the balance of a wallet address, essential for managing funds within the platform.
   - **tpe acc register:** Register a new account on the specified blockchain or network, allowing users to create and set up new accounts.
   - **tpe acc send-sk:** Send SK tokens to a specified address, enabling transactions and the transfer of assets.

2. **Container Management:**

   - **tpe container actions:** Perform various actions on containers, such as starting, stopping, or getting logs, crucial for managing deployed services.
   - **tpe container create:** Create new containers, facilitating the deployment of applications in isolated environments.
   - **tpe container list:** List containers owned by a user, providing an overview of deployed services.
   - **tpe container update:** Update container details, allowing for the modification and maintenance of deployed applications.
   - **tpe container upload:** Upload files to a container, necessary for deploying and updating application content.

3. **Smart Contract Management:**

   - **tpe contract deploy:** Deploy smart contracts to the blockchain, a key feature for launching decentralized applications.
   - **tpe contract get:** Call methods on deployed smart contracts, allowing users to interact with and query contract data.
   - **tpe contract set:** Execute methods on smart contracts, enabling the update and execution of contract functions.

4. **Storage Management:**

   - **tpe storage tasklist:** Show the list of all tasks for the current account, providing insights into ongoing operations.
   - **tpe storage upload:** Upload application files to the storage, essential for maintaining and updating application data.

5. **General Utilities:**

   - **tpe update [CHANNEL]:** Update the tpe CLI itself, keeping the tool up-to-date with the latest improvements.
   - **tpe help [COMMAND]:** Display help for specific commands, aiding users in understanding and using the CLI effectively.
   - **tpe autocomplete [SHELL]:** Display autocomplete installation instructions, improving command entry efficiency.

By leveraging these commands, you can effectively manage decentralized applications, ensuring smooth operation and deployment within a Web3 environment.
