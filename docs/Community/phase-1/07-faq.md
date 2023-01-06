# FAQ



## Can I change the node link after the launch?

**Yes.**

After the node is launched, you should send the bot a link to it. After that, the bot will check uptime every 10 minutes and give you testnet points.

It will be the last step in the Rover bot flow.

## How to check my ports?

You can check your ports [here](https://www.yougetsignal.com/tools/open-ports/).

The Power Node requires four opened ports:

```text
1080
1443
1800
80
```

where

- `1080` — HTTP / API;
- `1443` — HTTPS / API;
- `1800` — TPIC;
- `80` — SSL.

## How to open my ports

Please, check this step in the [Tea Ceremony manual](https://doc.thepower.io/docs/Community/phase-1/testnet-flow#step-5-start-the-tea-ceremony-client)

## How to solve problem with TPIC port?

TPIC (The Power Interconnect) is a protocol between nodes. 

If it is closed, your node won't be able to communicate with other ones.

TPIC uses port number `1080`.

## How to solve the problem if the APIS interface is not available?

Open port `1443` and install SSL. Check the manuals for:

1. [Docker](./02-download-build-run-docker.md#step-4-get-the-certificate).
2. [Source](./03-download-build-run-source.md#step-4-start-the-node).

## How to install SSL?

Check the manuals for:

1. [Docker](./02-download-build-run-docker.md#step-4-get-the-certificate).
2. [Source](./03-download-build-run-source.md#step-4-start-the-node).

## How to find my hostname?

You can find your node hostname in the `node.config` file, that you will get after the Tea Ceremony.

To view your hostname in a quick way, run:

```bash
grep hostname node.config
```

## Is it possible to run the node on another server after the Tea Ceremony?

Yes, but you need to start your node on the same server, where you have launched the Tea Ceremony client. 

After that, you can move your node and update the IP address on the DNS records.