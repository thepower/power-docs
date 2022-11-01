# Release Notes

## 01/11/2022

Hey Powerians!

Thank you for supporting Power DCloud and participating in the testnet campaign.

We have two great news:

1. The Rover bot already started to monitor testnet nodes. It checks status every 10 min. If the node is online and synced, you will get points that will be converted to SK tokens.

2. We released the Power Node v.0.13.11.

What's new:
   - Added API endpoints for node monitoring and forced sync launching.
   - These changes help with network monitoring and support node owners in the next stages.
   - Added detailed info about peer streams.
   - Added the ability to get block hash by block number

Please update your nodes.

> WARNING
> 
> Please be careful with the `node.config` and `genesis.txt`, as well as the `db` directory.


If you use the Docker image (container name: `your_node_container`):

1. Get the release [here](https://hub.docker.com/r/thepowerio/tpnode).
2. Stop the node.
3. Run the command one by one:

    1. ```bash
       docker rm tpnode
       ``` 
       
    2. ```bash
       docker rmi thepowerio/tpnode:latest
       ```
       
    3. ```bash
       docker pull thepowerio/tpnode:0.13.11
       ```
       
    4. ```bash
       docker run -d \
       --name tpnode \
       --mount type=bind,source="$(pwd)"/db,target=/opt/thepower/db \
       --mount type=bind,source="$(pwd)"/log,target=/opt/thepower/log \
       --mount type=bind,source="$(pwd)"/node.config,target=/opt/thepower/node.config \
       --mount type=bind,source="$(pwd)"/genesis.txt,target=/opt/thepower/genesis.txt \
       -p 41025:41025 \
       -p 1080:1080 \
       -p 1443:1443 \
       thepowerio/tpnode:0.13.11
       ```

If you build from source:
1. Get the release [here](https://github.com/thepower/tpnode/releases/tag/v0.13.11).
2. Stop the node.
3. Run the command one by one:

    1. ```bash
       git pull a519894f1348da267a10338d0f48fc075ed6960d
       ```
       
    2. ```bash
       ./rebar3 get-deps
       ```
       
    3. ```bash
       ./rebar3 compile
       ```
       
    4. ```bash
       ./rebar3 release
       ```
       
    5. ```bash
       cp -r _build/default/rel/thepower /opt/
       ```
       
    6. ```bash
       cd /opt/thepower
       ```
       
    7. ```bash
       ./bin/thepower foreground
       ```