# How to transfer a node into another chain?

:::info Note

You can use either `docker` or `docker-compose` commands.

:::

:::caution Attention

Before you start, please, find your node and a chain you intend to move your node into in [this file](https://tea.thepower.io/move.csv).

:::

To transfer your node into another chain:

1. Stop your node by using one of the following commands:

   ```bash
   docker stop tpnode && docker rm tpnode
   ```
   
   or

   ```bash
   docker-compose down
   ```

2. Back up your node by using the following command:

   ```bash
   tar -cvjf /opt/thepower ~/thepower_before.tar.bz2
   ```

3. Delete the database and logs using the following command:

   ```bash
   find /opt/thepower/db ! -path "*/db/cert/*" -exec rm {} \; && rm /opt/thepower/log/*	
   ```

4. Edit the configuration:

   1. Delete all data in square brackets in the following line:

      ```erlang
      {tpic,#{peers => [{"node2", 43218},{"node3", 43219}], port => 43217, allow_rfc1918 => true}}.
      ```

   2. Add the following line:

      ```erlang
      {replica, true}.
      ```

   3. Add the following:

      ```erlang
      {upstream, [
      "Insert_here_your_upstream_link1",
      "Insert_here_your_upstream_link2"
      ]}.
      ```

      :::caution Attention

      Take the upstream links from the [file](https://tea.thepower.io/upstream.txt).

      :::

5. Start the node using one of the following commands:

   ```bash
   docker run -d \
   --name tpnode \
   --restart unless-stopped \
   --mount type=bind,source=/opt/thepower/db,target=/opt/thepower/db \
   --mount type=bind,source=/opt/thepower/log,target=/opt/thepower/log \
   --mount type=bind,source=/opt/thepower/node.config,target=/opt/thepower/node.config \
   -p 1800:1800 \
   -p 1080:1080 \
   -p 1443:1443 \
   thepowerio/tpnode
   ```
   
   or

   ```bash
   docker-compose up -d
   ```
   
6. After going through the steps above, make sure that all works correctly:

   ```bash
   curl http://<hostname>:1443/api/node/status	
   ```
   
   where

   - `<hostname>` is your node name.

