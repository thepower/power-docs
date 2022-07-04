# How to install and start a testnet?

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

To start the testnet, ensure you have the following software installed on your machine:

- git,
- docker-compose.

> **Note**
> 
> If you use Unix, you must be included into the user group `docker` to use `docker-compose`.
>
> To check the groups, you are included into, run:
> 
> ```bash
> user@root:~$ groups
> ```
> To include your account into the group `docker`, run:
> 
> ```bash
> usermod + docker
> ```
> 
> This group is available only after you have installed Docker. If you haven't installed it yet, here is a [How-To](https://docs.docker.com/engine/install/). Go to the link and choose your OS.

### Installation

To install the testnet:

1. Clone the `test_shard` repository into your working directory using the following command:

   ```bash
   git clone https://github.com/thepower/test_shard.git
   ```

2. Go to `test_shard` directory:

   ```bash
   cd test_shard
   ```

### Starting the testnet

To start a testnet, run:

```bash
docker-compose up -d
```

After starting the testnet, node API is available under the following addresses:

```text
http://localhost:44001/api/status
http://localhost:44002/api/status
http://localhost:44003/api/status
```

### Stopping the testnet

Please, stop your local testnet after completing all necessary testing or development. To stop the testnet, run:

```bash
docker-compose down
```
