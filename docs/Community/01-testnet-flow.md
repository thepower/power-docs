# Testnet Campaign Flow (Phase 1)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Introduction](#introduction)
  - [Prerequisites for a node](#prerequisites-for-a-node)
    - [Hardware](#hardware)
    - [Software](#software)
- [What do I need to participate in testnet campaign?](#what-do-i-need-to-participate-in-testnet-campaign)
  - [Step 1: Learn](#step-1-learn)
  - [Step 2: Register the DNS](#step-2-register-the-dns)
  - [Step 3: Download the node](#step-3-download-the-node)
    - [Download and build the node using Docker](#download-and-build-the-node-using-docker)
    - [Download and build the node using the source code](#download-and-build-the-node-using-the-source-code)
  - [Step 4: Get the client and token](#step-4-get-the-client-and-token)
  - [Step 5: Start the client](#step-5-start-the-client)
  - [Step 6: Create directories and place the files](#step-6-create-directories-and-place-the-files)
  - [Step 7: Edit the file](#step-7-edit-the-file)
  - [Step 8: Get the certificate](#step-8-get-the-certificate)
  - [Step 9: Start the node](#step-9-start-the-node)
    - [Starting the node from Docker](#starting-the-node-from-docker)
    - [Starting the node from source code](#starting-the-node-from-source-code)
    - [How to check, if my node works?](#how-to-check-if-my-node-works)
- [What do I need to do if something goes wrong?](#what-do-i-need-to-do-if-something-goes-wrong)
  - [Troubleshooting](#troubleshooting)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Introduction

This simple guide will help you participate in ThePower testnet campaign.

### Prerequisites for a node

#### Hardware

| CPU cores | Memory       | Hard disk                     | Network    |
|-----------|--------------|-------------------------------|------------|
| 2         | 2 GB or more | Minimum: 20 GB, SSD preferred | 100 Mbit/s |

#### Software

| OS             | Erlang version | Eshell version | Docker version                         | Server           |
|----------------|----------------|----------------|----------------------------------------|------------------|
| Ubuntu v.20.04 | 22 or upper    | 10.4           | latest (20.10.18 as of September 2022) | Virtual machine  |



## What do I need to participate in testnet campaign?

To participate in ThePower testnet campaign you need to:

### Step 1: Learn

[Learn what is a testnet in DCloud](../Maintain/01-testnets-intro.md). This guide will help you understand what ThePower Testnet is.

### Step 2: Register the DNS

Register your DNS. ThePower will give you the third-level domain during the testnet campaign.

### Step 3: Download the node

Download ThePower Node. Here you have two options:

1. Download ThePower node using the [Docker image](https://hub.docker.com/r/thepowerio/tpnode), or
2. Download the [source](../Maintain/build-and-start-a-node/06-startingTpNode_source.md#downloading-and-building-the-node) code and build it.

#### Download and build the node using Docker

1. Ensure you have Docker installed on your machine.
2. If not, refer to [Docker Installation Guide](https://docs.docker.com/engine/install/).

   > **Hint:**
   >
   > If you don't use `root` account, run the following command to ensure you belong the user group `docker`:
   >
   > ```bash
   > $ groups
   > ```
   >
   > If you don't belong to the user group `docker`, run the following command:
   >
   > ```bash
   > $ sudo usermod -aG docker
   > ```
   
3. Get and start the [Tea Ceremony Client](../Maintain/03-get-and-start-tea-ceremony-client.md) to get the actual `node.config` and `genesis.txt` files. To do this, run the following command:

   ```bash
   wget https://tea.thepower.io/teaclient
   ```

4. Install Erlang. To do this, run:

   ```bash
   apt-get -y install erlang-base erlang-public-key erlang-ssl
   ```

5. Create `db` and `log` directories in your working directory (`/opt/thepower`, for instance).

   > **Hint**
   >
   > You can create an additional directory named `thepower`, for example, and place `db` and `log` as subdirectories there.

6. Place the files `genesis.txt` and `node.config` near `db` and `log` directories.

#### Download and build the node using the source code

1. Install the software you need to seamlessly install Erlang:

   ```bash
   apt install git libssl-dev clang cmake make automake autoconf libncurses5-dev gcc g++
   ```

2. Create a directory, where Erlang will be installed to:

   ```bash
   mkdir /opt/erlang
   ```

3. Create a directory, where you will work with your node:

   ```bash
   mkdir /opt/<your_node>
   ```

4. Go to `/opt/erlang` directory:

   ```bash
   cd /opt/erlang
   ```
   
5. Install Erlang. To do this, download the `kerl` script:

   ```bash
   curl -O https://raw.githubusercontent.com/kerl/kerl/master/kerl
   ```
   
   > **Hint**
   >
   > If you already have Erlang installed on your machine, we strongly recommend deleting it before the new installation, using the following command:
   >
   > ```bash
   > apt purge erlang*
   > ```

6. Change script mode to executable by using the following command:

   ```bash
   chmod a+x kerl
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
9. Create a new subdirectory in `erlang`:

   ```bash
   mkdir /opt/erlang/<your_directory_name>
   ```
10. Install Erlang to the subdirectory you've created on step 10 using the following command:

    ```bash
    ./kerl install 22.3.4.25 /opt/erlang/<your_directory_name>
    ```

11. Run the following command to activate the Erlang installation:

    ```bash
    source /opt/erlang/<your_directory_name>/activate
    ```
    
   > **Note:**
   >
   > If your Erlang installation is not activated, you will NOT be able to build the node.
    
   After setting up the working environment, you can download and build the node:
  
   > **Note**
   >
   > Choose a project folder to clone your project into. Use this folder to build the node.

12. Download the node sources from Github into your working directory (`your_node`, for instance), using the following command:

    ```bash
    git clone https://github.com/thepower/tpnode.git
    ```

13. Go to `tpnode` directory, using the command:

   ```bash
   cd tpnode
   ```
   
14. Compile the node source by running the following command:

    ```bash
    ./rebar3 compile
    ```
15. Pack the compiled node into a `tar` archive by running the following command:

    ```bash
    ./rebar3 tar

Now you can start the node.

> **Note**
> 
> The following steps 4, 5, and 6 are necessary if you are building the node from source ONLY.

### Step 4: Get the client and token

1. Get the Tea Ceremony client by running the following command:

   ```bash
   wget https://tea.thepower.io/teaclient
   ```

2. Change the `teaclient` file mode to executable by running the following command:

   ```bash
   chmod +x
   ```

   Otherwise, you will NOT be able to start the client. See the [Troubleshooting](#troubleshooting) section for more details.

3. Get the Tea Ceremony token from the testnet administrators.

   > **Note**
   > 
   > This and the following steps are crucial because you will NOT be able to start your node without `genesis.txt` and `node.config` files. You can find more information about these files [here](https://doc.thepower.io/docs/Maintain/build-and-start-a-node/tpNodeConfiguration).

### Step 5: Start the client

[Start the Tea Ceremony client](https://doc.thepower.io/docs/Maintain/get-and-start-tea-ceremony-client/#start-the-tea-ceremony-client) using the token you've got from the testnet administrators.

To start the client, run the following command:

```erlang
./teaclient 52E616B1B48C
```

where

- `teaclient` — Tea Ceremony client,
- `52E616B1B48C` — Tea Ceremony Token, you've got from the Tea Ceremony administrators.

After you have started the client, wait for other participants. Please, DON'T turn off the Tea Ceremony client for 24 hours.

> **Note**
>
> If the client is started without options, you will see a short reference on the command and options.

If you have successfully started the Tea Ceremony client, you will get `node.config` and `genesis.txt` files after the ceremony ends. You can find these files under the same directory where you have started the Tea Ceremony client.

> **Attention**
> 
> After the tea ceremony ends, you need to edit the `node.config`. To do this, refer to the Step 7 below.

### Step 6: Create directories and place the files

To create directories for files:

1. Go to your working directory using the following command:

   ```bash
   cd <your_working_directory>
   ```

2. Create `db` and `log` directories in your working directory (`/opt/my_node`, for instance) using the following command:

   ```bash
   mkdir db
   mkdir log
   ```

3. Place `genesis.txt` and `node.config` near these directories using the following commands:

   ```bash
   mv ~/example_directory/node.config /your_working_directory/node.config
   ```

   ```bash
   mv ~/example_directory/genesis.txt /your_working_directory/genesis.txt
   ```

### Step 7: Edit the file

Edit `node.config` file. See the [example](https://doc.thepower.io/docs/Maintain/build-and-start-a-node/tpNodeConfiguration#nodeconfig-example) in [How to configure TP-Node?](https://doc.thepower.io/docs/Maintain/build-and-start-a-node/tpNodeConfiguration) guide, and then refer to the section below.

#### How to edit `node.config`?

Here is the example of a chain consisting of five nodes:

```erlang
tpic, #{
    peers => [
        {"demonode01.thepower.io", 49003},
        {"demonode03.thepower.io", 49003},
        {"demonode04.thepower.io", 49003},
        {"demonode05.thepower.io", 49003}
        ],
    allow_rfc1918 => true,
    port => 49003} }.
{discovery,
    #{
        addresses => [
            #{address => "demonode02.thepower.io", port => 49003, proto => tpic},
            #{address => "demonode02.thepower.io", port => 49004, proto => api},
            #{address => "demonode02.thepower.io", port => 49005, proto => apis}
        ]
    }
}.

{hostname, "demonode02.thepower.io"}.
{dbsuffix,"_demonode02"}.
{loglevel, info}.
{info_log, "log/demonode02.log"}.
{error_log, "log/demonode02.log"}.
{debug_log, "log/demonode02.log"}.
{rpcsport, 49005}.
{rpcport, 49004}.

{privkey, "CC5AB2755B0D96D05E601D40CCAB9290D9D2E94A746A5E8AFE063EE73568DEFD"}.
```

Edit the file as follows:

1. Specify the node addresses and port numbers you've received from the bot. You don't need to specify your own node:

   ```erlang
   tpic, #{
    peers => [
        {"demonode01.thepower.io", 49003},
        {"demonode03.thepower.io", 49003},
        {"demonode04.thepower.io", 49003},
        {"demonode05.thepower.io", 49003}
        ],
   ```

2. Check the `allow_rfc1918` parameter to be `true`.
3. Check the `port` parameter. THe value of this parameter should be the same as the port value in `peers`:

   ```erlang
   port => 49003}
   ```
   
4. Specify your node and port to be used for `tpic`, `api`, and `apis` protocols in `addresses` parameter:

   ```erlang
   addresses => [
            #{address => "demonode02.thepower.io", port => 49003, proto => tpic},
            #{address => "demonode02.thepower.io", port => 49004, proto => api},
            #{address => "demonode02.thepower.io", port => 49005, proto => apis}
        ]
   ```

5. Specify your node address in `hostname` parameter:

   ```erlang
   {hostname, "demonode02.thepower.io"}.
   ```

6. Specify your node name in `dbsuffix` parameter:

   ```erlang
   {dbsuffix,"_demonode02"}.
   ```

7. Specify the `.log` files, where the logs for your node will be stored:

   ```erlang
   {info_log, "log/demonode02.log"}.
   {error_log, "log/demonode02.log"}.
   {debug_log, "log/demonode02.log"}.
   ```

8. Specify the ports for `rpc` and `rpcs` protocols:

   ```erlang
   {rpcsport, 49005}.
   {rpcport, 49004}.
   ```
 
> **Warning**
>  
> The private key you get with the `genesis.txt` file cannot be restored, if you lose it. Please, store it securely.
  
### Step 8: Get the certificate

[Obtain the SSL certificate for your node](https://doc.thepower.io/docs/Maintain/build-and-start-a-node/ssl-certs-for-node) and place it into the `db` directory.

### Step 9: Start the node

Start your node. Here you have two options:

1.  Start your node using [the Docker image](https://doc.thepower.io/docs/Maintain/build-and-start-a-node/startingTpNode_docker#starting-the-node), or
2.  Start your node from the [source code](https://doc.thepower.io/docs/Maintain/build-and-start-a-node/startingTpNode_source#starting-the-node).

> **Note**  
>
> Before starting up the node ensure, you have set up your environment.

#### Starting the node from Docker

To start the node from Docker, run:

```bash
docker run -d \
--name tpnode \
--mount type=bind,source="$(pwd)"/db,target=/opt/thepower/db \
--mount type=bind,source="$(pwd)"/log,target=/opt/thepower/log \
--mount type=bind,source="$(pwd)"/node.config,target=/opt/thepower/node.config \
--mount type=bind,source="$(pwd)"/genesis.txt,target=/opt/thepower/genesis.txt \
-p 43292:43292 \
-p 43392:43392 \
-p 43219:43219 \
thepowerio/tpnode
```

where:

| Command                                                                          | Description                                                                                                                                                 |
|----------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `docker run -d`                                                                  | This command starts Docker in the background                                                                                                                |
| `--name tpnode`                                                                  | This command specifies the name (optional)                                                                                                                  |
| `--mount type=bind,source="$(pwd)"/db,target=/opt/thepower/db`                   | Path to the database. Bound to Docker. `/opt` here is mandatory, because it is the path inside the container.                                               | 
| `--mount type=bind,source="$(pwd)"/log,target=/opt/thepower/log`                 | Path to log files. Bound to Docker. `/opt` here is mandatory, because it is the path inside the container.                                                  |
| `--mount type=bind,source="$(pwd)"/node.config,target=/opt/thepower/node.config` | Path to your `node.config` file. Bound to Docker. `/opt` here is mandatory, because it is the path inside the container.                                    |
| `--mount type=bind,source="$(pwd)"/genesis.txt,target=/opt/thepower/genesis.txt` | Path to your `genesis.txt`. Bound to Docker. `/opt` here is mandatory, because it is the path inside the container.                                         |
| `-p 43292:43292` <br /> `-p 43392:43392` <br /> `-p 43219:43219`                 | These commands specify all necessary local ports. In this examples ports `api`, `apis`, and `tpic` are used. You can specify any port in `node.config` file |
| `thepowerio/tpnode`                                                              | Path to Docker image.                                                                                                                                       |

#### Starting the node from source code

To start the node from source code:

   ```bash
   ./bin/thepower foreground
   ```

#### How to check, if my node works?

To check, if your node works, run:

```bash
curl http://your_node.example.com:00000/api/node/status | jq
```

where:

- `your_node.example.com` — your node address;
- `00000` — port, that your node uses.

You can also 

Replace the example parameters with the ones you need.

## What do I need to do if something goes wrong?

> **Attention**
> 
> If something goes wrong, go to the `log` folder, and read the logs. If there are errors, write to Power Ecosystem Telegram chat: `https://t.me/thepower_chat`.

### Troubleshooting

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
