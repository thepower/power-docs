# What do I need to participate in testnet campaign?

## Introduction

This simple guide will help you participate in ThePower testnet campaign.

## What do I need to participate in testnet campaign?

All you need to participate in ThePower testnet campaign is:

**Step 1**

[Learn what is a testnet in DCloud](http://Learn, what is a testnet in DCloud). This guide will help you understand what ThePower Testnet is.

**Step 2**

Register your DNS. ThePower will give you the third-level domain during the testnet campaign.

**Step 3**

Download ThePower Node. Here you have two options:

1.  Download ThePower node using the [Docker image](https://hub.docker.com/r/thepowerio/tpnode) and [set up your environment](https://doc.thepower.io/docs/build-and-start-a-node/startingTpNode_docker#setting-up-the-environment), or
2.  Download the [source](https://doc.thepower.io/docs/build-and-start-a-node/startingTpNode_source#downloading-and-building-the-node) code and build it.

> **Note**
> 
> In these guides, you will also find information on how to start up your node using the Docker image or the source code.

**Step 4**

[Get the Tea Ceremony client](https://doc.thepower.io/docs/devGuide/get-and-start-tea-ceremony-client/#get-the-tea-ceremony-client). Then, get the Tea Ceremony token from the testnet administrators.

This and the following steps are crucial because you will NOT be able to start your node without `genesis.txt` and `node.config` files. You can find more information about these files [here](https://doc.thepower.io/docs/build-and-start-a-node/tpNodeConfiguration).

**Step 5**

[Start the Tea Ceremony client](https://doc.thepower.io/docs/devGuide/get-and-start-tea-ceremony-client/#start-the-tea-ceremony-client) using the token you've got from the testnet administrators.

**Step 6**

Create `db` and `log` directories in your working directory (`/opt`, for instance) and place `genesis.txt` and `node.config` near these directories.

**Step 7**

Edit `node.config` by adding the addresses of nodes. See the [example](https://doc.thepower.io/docs/build-and-start-a-node/tpNodeConfiguration#nodeconfig-example) in [How to configure TP-Node?](https://doc.thepower.io/docs/build-and-start-a-node/tpNodeConfiguration) guide.

**Step 8**

[Obtain the SSL certificate for your node](https://doc.thepower.io/docs/build-and-start-a-node/ssl-certs-for-node) and place it into the `db` directory.

**Step 9**

Start your node. Here you have two options:

1.  Start your node using [the Docker image](https://doc.thepower.io/docs/build-and-start-a-node/startingTpNode_docker#starting-the-node), or
2.  Start your node from the [source code](https://doc.thepower.io/docs/build-and-start-a-node/startingTpNode_source#starting-the-node).

> **Note**  
>
> Before starting up the node ensure, you have set up your environment.