# Node update

## Before the update

1. Check out the Power Telegram chat, the Power news, or information about the problems with the node in [Zabbix](https://zabbix.thepower.io/zabbix.php?action=dashboard.view#). There you will find information about the necessity of update.

2. Back up your `node.config` and `genesis.txt`.

3. Check your node version by running the following command:

   ```bash
   curl -s http://{your_node_hostname}:1080/api/node/status | jq .status.ver
   ```

   :::note

   Your node may have automatic updates configured previously. In this case, you don't need to update your node manually (only for nodes started from the Docker image).

   Read [this](https://doc.thepower.io/docs/Community/phase-1/download-build-run-docker#step-5-optional-automated-updates-for-node-with-watchtower) manual to learn how to configure automatic node updates using Watchtower (only for nodes started from the Docker image).

   :::

## Updating your node built from Docker image

Check your node version by running the following command:

   ```bash
   curl -s http://{your_node_hostname}:1080/api/node/status | jq .status.ver
   ```

:::note

Your node may have automatic updates. In this case, you don't need to update your node manually (only for nodes started from the Docker image).

Read [this](https://doc.thepower.io/docs/Community/phase-1/download-build-run-docker#step-5-optional-automated-updates-for-node-with-watchtower) manual to learn how to configure automatic node updates (only for nodes started from the Docker image).

:::

To update your node:

1. Stop the node:

   ```bash
   docker stop tpnode
   ```

2. Delete the container:

   ```bash
   docker rm tpnode
   ```
   
3. Update the Docker image:

   ```bash
   docker pull thepowerio/tpnode
   ```
   
4. Restart your node by running the starting command:

   ```bash
    docker run -d \
    --name tpnode \
    --restart unless-stopped \
    --mount type=bind,source="$(pwd)"/db,target=/opt/thepower/db \
    --mount type=bind,source="$(pwd)"/log,target=/opt/thepower/log \
    --mount type=bind,source="$(pwd)"/node.config,target=/opt/thepower/node.config \
    --mount type=bind,source="$(pwd)"/genesis.txt,target=/opt/thepower/genesis.txt \
    
    <!--The commands below specify all necessary local ports. 
    In this example ports `api`, `apis`, and `tpic` are used. 
    Specify the port of your chain from `node.config` file.-->
    
    -p 1800:1800 \
    -p 1080:1080 \
    -p 1443:1443 \
    thepowerio/tpnode
    ```
   
## Updating your node built from sources

To update your node:

1. Go to your source code directory:

   ```bash
   cd path/to/your/sources
   ```
   
2. Update your source code:

   ```bash
   git pull 
   ```

3. Build your node according to [this](./03-download-build-run-source.md) guide.
4. Stop your node after it is built:

   ```bash
   systemctl stop tpnode.service
   ```
   
5. Replace your node code by rewriting the versions of directories:

   ```bash
   bin
   erts-*
   lib
   releases
   ```

   :::warning
   
   DO NOT update or delete the db directory.
   
   :::

   **OPTIONAL**: 

   You can delete all files, including `*.dump` files from `log` directory.

6. Start your node:

   ```bash
   systemctl start tpnode.service
   ```