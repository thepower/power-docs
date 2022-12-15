# Phase I Testneter Guide

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

<p align="center"><b>Done ; Easy Full Guide Tutorial [Here](https://github.com/DaddyUnikii/Deinfra-Testnet)</b></p>

