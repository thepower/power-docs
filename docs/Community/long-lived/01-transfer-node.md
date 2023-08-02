# How to transfer a node into another chain?

:::info Note

You can use either `docker` or `docker-compose` commands.

:::

:::caution Attention

Before you start, please, find your node and a chain you intend to move your node into in [**this file**](https://tea.thepower.io/move.csv).

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
   tar -cvjf ~/thepower_before.tar.bz2 /opt/thepower
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

      Take the upstream links from the [**file**](https://tea.thepower.io/upstream.txt).

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
   curl -s https://<hostname>:1443/api/node/status | jq .status.blockchain.chain,.status.blockchain.header.chain
   ```
   
   where

   - `<hostname>` is your node name.

:::info Note

   If the above-mentioned command returns two indifferent values, it means that the node has become a **Consensus Node** in a new chain. It must be reflected in configuration. To do this:

   1. Stop the node.
   2. Back it up.
   3. Open `node.config` file in editing mode and make the following changes:
   
      - Delete `{upstream ...}.` line,
      - Delete `{replica, true}` line,
      - Delete `db/peers` file,
      - Replace `{tpic,#{peers ... }}.` with a line from the table below, according to your chain number:

         | Chain number | Line   |
         |--------------|--------|
         | 1025         |`{tpic,#{peers => [{"c1025n02.thepower.io", 41025},{"c1025n04.thepower.io", 41025},{"http://c1025n05.thepower.io", 41025}], port => 41025, allow_rfc1918 => true}}.`|
         | 1026         |`{tpic,#{peers => [{"c1026n8.thepower.io", 41026},{"c1026n10.thepower.io", 41026},{"power-node.allsteeply.com", 41026}], port => 41026, allow_rfc1918 => true}}.`|
         | 1027         |`{tpic,#{peers => [{"c1027n7.thepower.io", 41027},{"thepower.lefey.ru", 41027},{"c1027n10.thepower.io", 41027}], port => 41027, allow_rfc1918 => true}}.`|
         | 1037         |`{tpic,#{peers => [{"c1037n2.deinfra.net", 1800},{"tpnode.nova-network.systems", 1800}], port => 1800, allow_rfc1918 => true}}.`|
         | 1038         |`{tpic,#{peers => [{"c1038n5.deinfra.net", 1800},{"c1038n6.deinfra.net", 1800},{"c1038n12.deinfra.net", 1800}], port => 1800, allow_rfc1918 => true}}.`|

      - Check `tpic` ports: 
      
         - for chains `1025`, `1026`, `1027` actual ports are `41025`, `41026`,`41027`.  
         - for chains `1037` and `1038` actual port is `1800`.

         :::caution Attention
      
         Please, specify these ports in node start-up command or in `docker-compose.yml`.
         
         :::

      - Save changes.
      - If you had a **Consensus Node**, exclude `genesis.txt` from start-up command or from `docker-compose.yml`.
      - Start the node.
      - Check that your node is working. The above-mentioned command must return same chain numbers, and a temporary must change.

:::

  There you will get two numbers: zero and a new chain number. As a first value, you'll get zero for **Seed Nodes** and an old chain number for **Consensus Nodes**.