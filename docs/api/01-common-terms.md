# Common Terms

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Introduction](#introduction)
- [Native node API](#native-node-api)
- [API features](#api-features)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Introduction

In the first version of The Power API, users interact with The Power network. The basic functionality includes the ability to conduct transactions, operations with blocks and with the wallet. The functionality will be extended in future releases.

The browsing APIs do not require authorization. All user actions resulting in the changing of network state are performed in the form of transactions signed by the user's private key.

All interaction with the network occurs via http protocol with the help of GET or POST requests.

## Native node API

The Native node API for direct integration client applications with blockchain nodes

Designed for remote calling of trusted procedures during the interactions of various participants in a trusted network and integration with devices and applications

## API features

The native node API has the following features:

- Reading data in blocks;
- Reading blockchain node settings;
- Working with transactions;
- Working with addresses;
- Checking the status;
- Reading the blocks.
