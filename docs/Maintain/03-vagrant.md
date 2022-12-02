# Setting up the environment and starting the testnet using Vagrant

As an option, you can use Vagrant to setup development environment.

Here is an example of setting up the development environment for MacOS.

## Installation and setting up Vagrant

To set up Vagrant, follow the steps below:

1. Install vagrant:

   ```bash
   brew install caskroom/cask/vagrant
   ```

2. If you use a VM:

    1. For Parallels, add Parallels support to Vagrant:

       ```bash
       vagrant plugin install vagrant-parallels
       ```

    2. For VirtualBox (default option), modify the `PATH` variable to add the VirtualBox binary to Vagrant:

       ```bash
       export PATH=/Applications/VirtualBox.app/Contents/MacOS:$PATH
       ```

3. Install the hostmanager plugin to manage the `/etc/hosts` file:

   ```bash
   vagrant plugin install vagrant-hostmanager
   ```

## Setting up the environment

To set up the environment, follow the steps below:

1. Clone the `tpnode` repository from Github and go to `tpnode` directory.

2. Start the virtual machine using Vagrant:

   ```bash
   vagrant up
   ```

   > **Attention**
   >
   > When running the Vagrant command, provisioning will be started. During the provisioning, Vagrant downloads all the necessary libraries and compiles the proper versions of Erlang and other environment components.Reboot the virtual machine after successful provisioning using the following commands:
   >
   > ```bash
   > vagrant halt
   > ```
   >
   > ```bash
   > vagrant up
   > ```

3. Connect to virtual environment by running:

   ```bash
   vagrant ssh -- -A
   ```

   where:

    - `-A` — key to ssh agent forwarding. You will be able to use ssh key from host machine to perform operations inside the virtual machine.

## Compiling and starting the node

1. Go to the project directory:

   ```bash
   cd /vagrant
   ```

2. Compile the testnet by running the following command:

   ```bash
   make buildtest
   ```

3. Start the testnet by running the script:

   ```bash
   ./bin/testnet.sh
   ```
## Stopping the testnet

To stop the testnet, run:

```bash
./bin/testnet.sh stop
```

## Using Makefile targets

You can also use the Makefile targets as a reference on how to perform other tasks.

## Using API

You can see the API ports by running:

```bash
netstat -an |grep 498
```

> **Note**
>
> After you've started testnet you should see 9 different ports. You can use these ports for The Power nodes API calls.
>
> API call sample:
>
> ```bash
> curl http://pwr.local:49841/api/node/status | jq .
> ```
>
> Note: the domain `pwr.local` in URL is used to reference the node from virtual or host machine.
