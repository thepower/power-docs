# How to install and start a testnet?

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**


- [Introduction](#introduction)
- [Testnet installation](#testnet-installation)
   - [Prerequisites](#prerequisites)
   - [Starting the testnet](#starting-the-testnet)
   - [Stopping the testnet](#stopping-the-testnet)
   - [How to delete a Docker image?](#how-to-delete-a-docker-image)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Introduction

This manual describes how you can configure a testnet.

Here are some terms to start with:

- **Testnet**,
- **Test chain**.

These terms mean the same, except that you can form your testnet out of more than one chain.

## Testnet installation

> **Attention**
>
> This testnet uses preinstalled private keys for nodes. These keys are open and used for testing purposes only. Therefore, the testnet will be compromised when using it in a real-world system.

### Prerequisites

To start the testnet, ensure you have installed Docker. Run the following command:

```bash
sudo apt-get -y install docker.io jq curl
```

:::tip Hint

If you use Unix, you must be included into the user group `docker` to use `docker`.

To check the groups, you are included into, run:
 
```bash
$ groups
```
To include your account into the group `docker`, run:

```bash
usermod -aG docker user
```

where:

-  -G, --groups GROUPS — new list of supplementary `GROUPS`
-  -a, --append — append the user to the supplemental `GROUPS`. Mentioned by the `-G` option without removing
   the user from other groups.
 
This group is available only after you have installed Docker. If you haven't installed it yet, here is a [How-To](https://docs.docker.com/engine/install/). Go to the link and choose your OS.

:::

### Starting the testnet

To start a testnet, run:

```bash
docker pull thepowerio/tpnode 
docker run -d  -p 1080:1080 --rm --name tptest thepowerio/tpnode
```

To test your chain, run the following sequence of commands:

```bash
curl http://localhost:44000/api/node/status | jq
```

```bash
curl http://localhost:44000/api/block/last | jq
```

### Stopping the testnet

Please, stop your local testnet after completing all necessary testing or development. To stop the testnet, run:

```bash
docker stop tptest
```

### How to delete a Docker image?

To delete Docker image from your machine, run:

```bash
docker rmi thepowerio/tpnode
```