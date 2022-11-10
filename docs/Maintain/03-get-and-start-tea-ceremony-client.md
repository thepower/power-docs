# How to start a client?

**Table of Contents**

   - [Introduction](#introduction)
   - [Set up your environment](#set-up-your-environment)
   - [Get the Tea Ceremony client](#get-the-tea-ceremony-client)
   - [Start the Tea Ceremony client](#start-the-tea-ceremony-client)
   - [After the client is started](#after-the-client-is-started)
   - [After the successful ceremony](#after-the-successful-ceremony)

## Introduction

This guide will help you get and start the Tea Ceremony client. You can find the additional information about the Tea Ceremony algorithm [here](../Explore/technology/10-tea-ceremony.md).

## Set up your environment

> **Note**
>
> To start the Tea ceremony client, ensure you have Erlang installed on your machine.

Before starting Tea Ceremony you need to set up your environment by installing Erlang. You will need Erlang to run the Tea Ceremony client. You will not be able to start the node and connect to the chain without Tea Ceremony. To install Erlang, run:

   ```bash
   apt -y install erlang-base erlang-public-key erlang-ssl
   ```

> **Note**
>
> You need to install `erlang-public key` and `erlang-ssl`. Otherwise, Erlang will not operate properly!

## Get the Tea Ceremony client

Open the terminal and run the following command to get the Tea Ceremony client:

```bash
wget https://tea.thepower.io/teaclient
```

## Start the Tea Ceremony client

1. Change `teaclient` file mode to executable by running the following command:

   ```bash
   chmod +x tea*
   ```

Run the following command to start Tea Ceremony client:

```erlang
./teaclient -n nickname token
```

where

- `teaclient` — Tea Ceremony client,
- `nickname` - The name of your node. Maximum 10 characters.
- `token` — Tea Ceremony Token, you've got from the Tea Ceremony bot.

Token consists of two parts at the moment:

1. **Public** part, that is common for all nodes in the chain, and
2. **Private** part, that is unique for each node.

If you start the Tea Ceremony with the public part of the token, you will be able to check the ports availability.

After you have started the client, wait for other participants. Please, DON'T turn off the Tea Ceremony client for 24 hours.

> **Note**
>
> If the client is started without options, you will see a short reference on the command and options.

If you have successfully started the Tea Ceremony client, you will get `node.config` and `genesis.txt` files after the ceremony ends. You can find these files under the same directory where you have started the Tea Ceremony client.

> **Attention**
>
> After the tea ceremony ends, you need to edit the `node.config`. To do this, refer to the guide, depending on your way of building the node (Step 6).

::: tip Tip

You can get a ready-to-work `node.config` file. To do this, rerun the Tea Ceremony.

:::

::: warning Nickname requirements

Check out the nickname requirements:

- min. 4 symbols;
- max. 16 symbols;
- the nickname must contain alphanumeric symbols of any case.

:::

## After the client is started

After the client is started, all the nodes in the chain sign the `genesis.txt` with their private keys. After that, the ceremony ends.

> **Note**
>
> You can shut the client down and start it up again if you need to. It will slow down the Tea Ceremony but will not disrupt it.

## After the successful ceremony

After the successful tea ceremony, the following files are created in the working directory:

- `genesis.txt` signed with the private keys of all the nodes in the chain,
- `node.config` containing the node private key.

After the Tea Ceremony ends successfully, you can start the node from the [Docker image](build-and-start-a-node/05-startingTpNode_docker.md) or [source code](build-and-start-a-node/06-startingTpNode_source.md) using our guides.