# Phase I Testneter Guide

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of contents**

- [Install Erlang on Ubuntu 20 Tea Ceremony](#install-erlang-on-ubuntu-20-tea-ceremony)
- [Install Deinfra Tea Ceremony](#install-deinfra-tea-ceremony)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

:::warning

This option is used for Ubuntu 20.04 and was originally proposed by the Community. This option was not either tested or supported. The Power Ecosystem is not responsible for the results of using this option.

:::

## Install Erlang on Ubuntu 20 Tea Ceremony

```bash
sudo apt update
sudo apt upgrade
sudo apt install git
```

```bash
sudo apt install curl wget gnupg apt-transport-https -y
```

```bash
curl -fsSL https://packages.erlang-solutions.com/ubuntu/erlang_solutions.asc | sudo gpg --dearmor -o /usr/share/keyrings/erlang.gpg
```

```bash
echo "deb [signed-by=/usr/share/keyrings/erlang.gpg] https://packages.erlang-solutions.com/ubuntu $(lsb_release -cs) contrib" | sudo tee /etc/apt/sources.list.d/erlang.list
```

```bash
sudo apt update
sudo apt install erlang
```

## Install Deinfra Tea Ceremony 

```bash
wget https://tea.thepower.io/teaclient
```

```bash
chmod +x teaclient
```

[Here](https://github.com/DaddyUnikii/Deinfra-Testnet) you can find the full Easy Testnet Guide.