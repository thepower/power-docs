# Power SDK

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Features](#features)
- [SDK Modules](#sdk-modules)
- [Installation](#installation)
- [Useful links](#useful-links)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

The Power SDK is the SDK for developing decentralized applications of the Power DCloud platform.

## Features

1. Power SDK interacts with the blockchain without intermediaries and without the need to run a node:

    - developer doesn't need to write a backend API for user-blockchain interactions.
    - user directly connects to the blockchain via the developer-connected SDK, which works directly as a part of a dApp.

2. Power SDK directly receives data from the contract storage and sends transactions to EVM smart contract in Frontend at any JS/TS dApp (web- or mobile-based, could be hosted in DStorage).

## SDK Modules

The Power SDK contains the following modules:

- address;
- crypto;
- EVM API;
- network;
- SC Interface;
- payments;
- SC Loader;
- transactions;
- wallet.

## Installation

Installation is described [**here**](02-sdk-installation.md).

## Useful links

- [**Working with transactions**](development/transactions/01-intro.md);
- [**Working with smart-contracts**](development/smart-contracts/01-intro.md).