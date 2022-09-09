# Testnet Campaign Flow

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Introduction](#introduction)
- [What do I need to participate in testnet campaign?](#what-do-i-need-to-participate-in-testnet-campaign)
  - [Step 1: Learn](#step-1-learn)
  - [Step 2: Register the DNS](#step-2-register-the-dns)
  - [Step 3: Download the node](#step-3-download-the-node)
  - [Step 4: Get the client](#step-4-get-the-client)
  - [Step 5: Start the client](#step-5-start-the-client)
  - [Step 6: Create directories and place the files](#step-6-create-directories-and-place-the-files)
  - [Step 7: Edit the file](#step-7-edit-the-file)
  - [Step 8: Get the certificate](#step-8-get-the-certificate)
  - [Step 9: Start the node](#step-9-start-the-node)
- [What do I need to do if something goes wrong?](#what-do-i-need-to-do-if-something-goes-wrong)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Introduction

This simple guide will help you participate in ThePower testnet campaign.

## What do I need to participate in testnet campaign?

All you need to participate in ThePower testnet campaign is:

### Step 1: Learn

[Learn what is a testnet in DCloud](./Maintain/01-testnets-intro.md). This guide will help you understand what ThePower Testnet is.

### Step 2: Register the DNS

Register your DNS. ThePower will give you the third-level domain during the testnet campaign.

### Step 3: Download the node

Download ThePower Node. Here you have two options:

1. Download ThePower node using the [Docker image](https://hub.docker.com/r/thepowerio/tpnode), or
2. Download the [source](./Maintain/build-and-start-a-node/05-startingTpNode_source.md#downloading-and-building-the-node) code and build it.

#### Download and build the node using Docker

1. Ensure you have Docker installed on your machine.
2. If not, refer to [Docker Installation Guide](https://docs.docker.com/engine/install/).
3. Run the following command to ensure you belong the user group `docker`:

   ```bash
   $ groups
   ```

4. If you don't belong to the user group `docker`, run the following command:

   ```bash
   $ sudo usermod -aG docker
   ```

5. Get and start the [Tea Ceremony CLient](./Maintain/03-get-and-start-tea-ceremony-client.md) to get the actual `node.config` and `genesis.txt` files. To do this, run the following command:

  ```bash
wget https://tea.thepower.io/teaclient.uu
  ```

6. Install Erlang. To do this, run:

```bash
apt-get -y install erlang-base erlang-public-key erlang-ssl
```

7. Create `db` and `log` directories in your working directory (`/opt`, for instance).

   > **Hint**
   >
   > You can create an additional directory named `thepower`, for example, and place `db` and `log` as subdirectories there.

8. Place the files `genesis.txt` and `node.config` near `db` and `log` directories.

#### Download and build the node using the source code

1. Install the software you need to seamlessly install Erlang:

   ```bash
   apt install git libssl-dev clang cmake make automake autoconf libncurses5-dev gcc g++
   ```

2. [Generate](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent#generating-a-new-ssh-key) an SSH key and [add](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account#adding-a-new-ssh-key-to-your-account) it to your Github account. 

   > **Attention**
   > 
   > If you skip this step, you will NOT be able to download and build the node from source.

4. Install Erlang. To do this, download the `kerl` script:

   ```bash
   curl -O https://raw.githubusercontent.com/kerl/kerl/master/kerl
   ```
   
   > **Note**
   >
   > If you already have Erlang installed on your machine, we strongly recommend deleting it before the new installation, using the following command:
   >
   > ```bash
   > apt purge erlang*
   > ```

5. Change script mode to executable by using the following command:

   ```bash
   chmod a+x kerl
   ```

6. Create a new directory in `/opt`. You can choose any name for this directory. Noteworthy is that the name should be descriptive for you:

   ```bash
   mkdir erlang
   ```
7. Update the list of Erlang releases using the following command:

   ```bash
   ./kerl update releases
   ```

8. Build the release 22.3.4.25 using the following command:

   ```bash
   ./kerl build 22.3.4.25
   ```

   > **Important**
   >
   > You need to install Erlang ver. 22.3.4.25. Other versions may not work correctly.

   After installation is complete, you will see the following message in the console:
  
      ```text
      Erlang/OTP 22.3.4.25 (22.3.4.25) has been successfully built
      ```

9. Install Erlang using the following command:

   ```bash
   ./kerl install 22.3.4.25 /opt/erlang
   ```

10. Run the following command to activate the Erlang installation:

    ```bash
    source /opt/erlang/activate
    ```

    After setting up the working environment, you can download and build the node:
  
   > **Note**
   >
   > Choose a project folder to clone your project into. Use this folder to build the node.

11. Download the node sources from Github into your working directory (`your_node`, for instance), using the following command:

    ```bash
    git clone https://github.com/thepower/tpnode.git
    ```

12. Delete the previous builds (if present) in `/tpnode` by running the following command:

   ```bash
   rm -rf _build/default/*
   ```

13. Compile the node source by running the following command:

    ```bash
    ./rebar3 compile
    ```
14. Pack the compiled node into a `tar` by running the following command:

    ```bash
    ./rebar3 tar
    ```

   > **Note**
   >
   > This step is optional. `tar`-package is needed to quickly transfer the compiled source code. However, it can be a good option if you need to download the source manifold.

Now you can start the node.

> **Note**
> 
> The following steps 4, 5, and 6 are necessary if you are building the node from source ONLY.

### Step 4: Get the client and token

Get the Tea Ceremony client:

```bash
wget https://tea.thepower.io/teaclient.uu
```

. Then, get the Tea Ceremony token from the testnet administrators.

This and the following steps are crucial because you will NOT be able to start your node without `genesis.txt` and `node.config` files. You can find more information about these files [here](./Maintain/build-and-start-a-node/01-tpNodeConfiguration.md).

### Step 5: Start the client

[Start the Tea Ceremony client](./Maintain/03-get-and-start-tea-ceremony-client.md#start-the-tea-ceremony-client) using the token you've got from the testnet administrators.

To start the client, open the Erlang console and run the following command:

```erlang
./teaclient.uu 52E616B1B48C
```

where

- `teaclient.uu` — Tea Ceremony client,
- `52E616B1B48C` — Tea Ceremony Token, you've got from the Tea Ceremony administrators.

> **Note**
> 
> Change the `teaclient` file mode to executable by running the following command:
> 
> `chmod +x`
> 
> Otherwise, you will NOT be able to start the client. See the [Quick Troubleshooting](#quick-troubleshooting) section for more details.

After you have started the client, you can watch the Tea Ceremony process.

> **Note**
>
> If the client is started without options, you will see a short reference on the command and options.

### Step 6: Create directories and place the files

Create `db` and `log` directories in your working directory (`/opt`, for instance) and place `genesis.txt` and `node.config` near these directories.

### Step 7: Edit the file

Edit `node.config` by adding the IP-address of your node. See the [example](https://doc.thepower.io/docs/build-and-start-a-node/tpNodeConfiguration#nodeconfig-example) in [How to configure TP-Node?](https://doc.thepower.io/docs/build-and-start-a-node/tpNodeConfiguration) guide.

### Step 8: Get the certificate

[Obtain the SSL certificate for your node](./Maintain/build-and-start-a-node/02-ssl-certs-for-node.md) and place it into the `db` directory.

### Step 9: Start the node

Start your node. Here you have two options:

1.  Start your node using [the Docker image](./Maintain/build-and-start-a-node/04-startingTpNode_docker.md#starting-the-node), or
2.  Start your node from the [source code](./Maintain/build-and-start-a-node/05-startingTpNode_source.md#starting-the-node).

> **Note**  
>
> Before starting up the node ensure, you have set up your environment.

## What do I need to do if something goes wrong?

If something goes wrong, go to the `log` folder, and read the logs. If there are errors, write to Power Ecosystem Telegram chat: `https://t.me/thepower_chat`.

### Quick troubleshooting

1. You get the following error:

    ```bash
    ===> Failed to boot tpnode for reason {{{badmatch,undefined},
    [{nodekey,get_priv,0,
    [{file,
    "/home/thepower/tpnode/apps/tpnode/src/nodekey.erl"},
    {line,26}]},
    {tpic2,certificate,0,
    [{file,
    "/home/thepower/tpnode/apps/tpic2/src/tpic2.erl"},
    {line,196}]},
    {tpic2,
    '-childspec/0-fun-0-',2,
    [{file,
    "/home/thepower/tpnode/apps/tpic2/src/tpic2.erl"},
    {line,217}]},
    {tpic2,childspec,0,
    [{file,
    "/home/thepower/tpnode/apps/tpic2/src/tpic2.erl"},
    {line,229}]},
    {tpnode_sup,init,1,
    [{file,
    "/home/thepower/tpnode/apps/tpnode/src/tpnode_sup.erl"},
    {line,88}]},
    {supervisor,init,1,
    [{file,"supervisor.erl"},
    {line,295}]},
    {gen_server,init_it,2,
    [{file,"gen_server.erl"},
    {line,374}]},
    {gen_server,init_it,6,
    [{file,"gen_server.erl"},
    {line,342}]}]},
    {tpnode,start,[normal,[]]}}
    ```
   **Reason**
   
   You don't have `genesis.txt` and `node.config` files.
   
   **Solution**
    
   Start the Tea Ceremony client **BEFORE** starting the node. It will get proper `genesis.txt` and `node.config`.

2. You get the following error when starting the Tea Ceremony client:

   ```bash
    ~/tpnode# ./teaclient.uu DEE570BD76F3
    -bash: ./teaclient.uu: Permission denied
   ```
   
   **Reason**
   
   Probably, you haven't changed `teaclient` file mode to executable.
   
   **Solution**

   Change `teaclient` file mode to executable by running the following command:

   ```bash
   chmod +x tea*
   ```
