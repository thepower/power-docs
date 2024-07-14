<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Starting the node from Docker](#starting-the-node-from-docker)
  - [Introduction](#introduction)
  - [Setting up the environment](#setting-up-the-environment)
  - [Starting the node](#starting-the-node)
  - [Stopping the node in Docker](#stopping-the-node-in-docker)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Starting the node from Docker

<!-- start DOCTOC -->
<!-- end DOCTOC -->

## Introduction

You can start a TP-Node using the [Docker image](https://hub.docker.com/r/thepowerio/tpnode).

## Setting up the environment

Before you start a TP-Node using the Docker image:

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

3. Get and start the [Tea Ceremony Client](../04-get-and-start-tea-ceremony-client.md) to get the actual `node.config` and `genesis.txt` files.
4. Create `db` and `log` directories in your working directory (`/opt`, for instance).

   > **Hint**
   >
   > You can create an additional directory named `thepower`, for example, and place `db` and `log` as subdirectories there.

5. Place the files `genesis.txt` and `node.config` near `db` and `log` directories.

## Starting the node

To start the node run the following command:

```bash
docker run -d \
--name tpnode \
--restart unless-stopped \
--mount type=bind,source=/opt/thepower/db,target=/opt/thepower/db \
--mount type=bind,source=/opt/thepower/log,target=/opt/thepower/log \
--mount type=bind,source=/opt/thepower/node.config,target=/opt/thepower/node.config \
--mount type=bind,source=/opt/thepower/genesis.txt,target=/opt/thepower/genesis.txt \
-p 1800:1800 \
-p 1080:1080 \
-p 1443:1443 \
thepowerio/tpnode
```

where:

| Command                                                                          | Description                                                                                                                                                                                                              |
|----------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `docker run -d`                                                                  | This command starts Docker in the background                                                                                                                                                                             |
| `--name tpnode`                                                                  | This command specifies the name (optional)                                                                                                                                                                               |
| `--restart unless-stopped`                                                       | This options helps to avoid manual Deocker restart in case of a server restart                                                                                                                                           |
| `--mount type=bind,source="$(pwd)"/db,target=/opt/thepower/db`                   | Path to the database. Bound to Docker. `/opt` here is mandatory, because it is the path inside the container.                                                                                                            | 
| `--mount type=bind,source="$(pwd)"/log,target=/opt/thepower/log`                 | Path to log files. Bound to Docker. `/opt` here is mandatory, because it is the path inside the container.                                                                                                               |
| `--mount type=bind,source="$(pwd)"/node.config,target=/opt/thepower/node.config` | Path to your `node.config` file. Bound to Docker. `/opt` here is mandatory, because it is the path inside the container.                                                                                                 |
| `--mount type=bind,source="$(pwd)"/genesis.txt,target=/opt/thepower/genesis.txt` | Path to your `genesis.txt`. Bound to Docker. `/opt` here is mandatory, because it is the path inside the container.                                                                                                      |
| `-p 1800:1800` <br/> `-p 1080:1080` <br/> `-p 1443:1443`                       | These commands specify all necessary local ports. In this examples ports `api`, `apis`, and `tpic` are used. You can specify any port in `node.config` file. The ports should be the same as specified in `node.config`. |
| `thepowerio/tpnode`                                                              | Path to Docker image.                                                                                                                                                                                                    |

## Stopping the node in Docker

To stop the node, use the following commands:

1. ```bash
   docker stop tpnode
   ```
2. ```bash
   docker rm tpnode
   ```
