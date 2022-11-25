# Testnet News

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [24/11/2022: The New Tea Ceremony Series](#24112022-the-new-tea-ceremony-series)
- [04/11/2022: we have run testnet, the first chain is now online!](#04112022-we-have-run-testnet-the-first-chain-is-now-online)
- [01/11/2022: Monitoring, tokens, Power Node version updated](#01112022-monitoring-tokens-power-node-version-updated)
- [Power node version update](#power-node-version-update)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 24/11/2022: The New Tea Ceremony Series

Hey, Powerians!

We are glad to announce the new Tea Ceremony series.

- The **personal** Tea Ceremony tokens were assigned to those, who were on the whitelist till November, 24.

- **The next Tea Ceremony will be this Monday 1 pm GMT**.

The dates of other Ceremonies will be determined by **vote**. Follow our chat.

We have performed a popular time slot vote, and here are the results:

![timeslots](./resources/timeslots.png)

The chain Tea Ceremony token will be published on our [News channel](https://t.me/thepowerio).

_There will be a 10-node chain started for the first 10 participants, who will successfully pass the test assignment. The next chain will be started on the next day after the first one. We are ready to give our Powerians a possibility to pass the chain themselves, because the project team was constantly supporting our Community members during the first three chains. Now, we have improved **node configuration software** and **docs**._

At this stage, we have not only the Project team, but 30 node owners, who could help the users to start the nodes.

For example, the first chain was started in a week, the third one — in just ONE day!

If our dear Powerians will start the new chain in one day as well, the next chain will be started on the next day (Tuesday), and the other chains will be started chain by the chain in the second most popular (according to the vote, look above) time slot. So, enjoy your weekend, get your servers ready, and carefully read the docs, preparing yourself for the next start.

The new whitelist will be formed out of those Powerians, who joined in after November, 24.

So, you can continue doing your test assignment. All Powerians, who are now on their way to pass the test, will get the tokens during the next give-out that will happen right after the already tokenised Powerians pass. Follow the news!

## 04/11/2022: we have run testnet, the first chain is now online!

![pic](resources/pic2.jpg)

Hey, Powerians!

We are glad to announce, that we've successfully run the first chain of our testnet, yoo-hoo!

You can now monitor the chain status, as well as get information about all the nodes in the chain [here](https://zabbix.thepower.io/zabbix.php?action=dashboard.view)

During the launch we've worked in close cooperation with our Superpower-community, which fully consists of true crypto-enthusiasts.

Thank you for your help and great cooperation ability, our dear Powerians!

Follow the news!

## 01/11/2022: Monitoring, tokens, Power Node version updated

Hey, Powerians!

Thank you for supporting Power DCloud and participating in the testnet campaign.

**We have two great news:**

1. The Rover bot already started to monitor testnet nodes. It checks status every 10 min. If the node is online and synced, you will get points that will be converted to SK tokens.

2. We released the Power Node v.0.13.11.

   **What's new:**
      - Added API endpoints for node monitoring and forced sync launching.
      - These changes help with network monitoring and support node owners in the next stages.
      - Added detailed info about peer streams.
      - Added the ability to get block hash by block number.

## Power node version update

Please, update your node according to the manual below.

> WARNING
> 
> Please be careful with the `node.config` and `genesis.txt`, as well as the `db` directory.


**If you use the Docker image (container name: `your_node_container`):**

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
    
    4. Run `cd /opt/thepower` and then run the command under the step 5.
       
    5. ```bash
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

**If you build the node from source code:**

1. Get the release [here](https://github.com/thepower/tpnode/releases/tag/v0.13.11).
2. Stop the node.
3. Run the command one by one:

    1. ```bash
       git checkout a519894f1348da267a10338d0f48fc075ed6960d
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
