# How to start a TP-Node from the source?
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

**Table of Contents**

- [Introduction](#introduction)
- [Setting up the environment](#setting-up-the-environment)
  - [Install Erlang using the package manager](#install-erlang-using-the-package-manager)
  - [Install Erlang using `kerl`](#install-erlang-using-kerl)
- [Downloading and building the node](#downloading-and-building-the-node)
- [Starting the node](#starting-the-node)
  - [Starting the node in Dev Mode](#starting-the-node-in-dev-mode)
  - [Starting the node in Release Mode](#starting-the-node-in-release-mode)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Introduction

TP-Node is the main module of The Power Ecosystem. In this manual, you'll learn how to start a node from the source code on Linux.

## Setting up the environment

Before you start your TP-Node, you need to set up the environment.

### Install Erlang

You can install Erlang either using the package manager, or using `kerl`.

#### Install Erlang using the package manager

If you use the recommended Ubuntu version (22.04.1), you can install Erlang using the package manager. To do this, run the following command:

   ```bash
   apt install cmake clang gcc git curl libssl-dev build-essential automake autoconf libncurses5-dev elixir erlang
   ```

If you use other version of Ubuntu (20.04, for instance), refer to the section below to install Erlang using `kerl`.

#### Install Erlang using `kerl`

To install Erlang using `kerl`:

1. Download the `kerl` script

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

2. Change script mode to executable by using the following command:

   ```bash
   chmod a+x kerl
   ```

3. Go to the `/opt` directory:

   ```bash
   cd /opt
   ```

4. Create a new directory in `/opt`. You can choose any name for this directory. Noteworthy is that the name should be descriptive for you:

   ```bash
   mkdir erlang
   ```

5. Go back to the root directory:

   ```bash
   cd ~
   ```

6. Update the list of Erlang releases using the following command:

   ```bash
   ./kerl update releases
   ```

7. Build the release 24.3 using the following command:

   ```bash
   ./kerl build 24.3
   ```

After installation is complete, you will see the following message in the console:

   ```text
   Erlang/OTP 24.3 (24.3) has been successfully built
   ```

8. Install Erlang using the following command:

   ```bash
   ./kerl install 24.3 /opt/erlang
   ```

9. Run the following command to activate the Erlang installation:

   ```bash
   source /opt/erlang/activate
   ```

## Downloading and building the node

After setting up the working environment, you can download and build the node:

> **Note**
> 
> Choose a project folder to clone your project into. Use this folder to build the node.

1. Download the node sources from Github into your working directory (`your_node`, for instance), using the following command:

   ```bash
   git clone https://github.com/thepower/tpnode.git -b e24
   ```

2. Delete the previous builds (if present) in `/tpnode` by running the following command:

   ```bash
   rm -rf _build/default/*
   ```

3. Compile the node source by running the following command:

   ```bash
   ./rebar3 compile
   ```
4. Build the release by running the following command:

   ```bash
   ./rebar3 release
   ```

5. Copy the node directory from `_build/default/rel/thepower` to `/opt` by running the following command:

   ```bash
   cp -r _build/default/rel/thepower /opt
   ```

Now you can start the node.

## Starting the node

You can start a node in two different modes:

- Dev Mode. In this mode, you can start a node without building a release.
- Release Mode. In this mode, you must build the release before starting the node.

### Starting the node in Dev Mode

1. Before starting the node in Dev Mode, start a `tmux` session:

```bash
tmux
```

To start the node in Dev Mode, run:

```bash
./rebar3 shell
```
### Starting the node in Release Mode

1. Refer to ["Downloading and building the node"](#downloading-and-building-the-node) section above to build the node.
2. To start the node, run:

   ```bash
   ./bin/thepower foreground
   ```
