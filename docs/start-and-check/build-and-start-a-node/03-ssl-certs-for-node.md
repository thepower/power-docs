<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [How to obtain an SSL certificate for a node?](#how-to-obtain-an-ssl-certificate-for-a-node)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# How to obtain an SSL certificate for a node?

Congratulations! Now you have a started and functional node, responding by `http`. Now, let's set up https! Follow the steps below:

1. Ensure that you use `root` account. It is necessary for further steps.
2. Install `acme.sh` by running the following command. Please, specify your real e-mail address:

   ```bash
   apt-get install socat
   curl https://get.acme.sh | sh -s email=my@example.com
   ```
   
   where

   `my@example.com` — your active e-mail. Make sure, you have replaced it with your e-mail address.

3. Log out of the system.
4. Log in again.
5. Obtain the certificate. To do this, run the following command:

   :::tip

   If you have reached the threshold, try another server. Use the [link](https://github.com/acmesh-official/acme.sh/wiki/Server) for more information.

   :::

   :::important

   Here you may receive the **"Timeout"** error.

   The reason is in closed `tcp/80` port.

   The solution is to open this port or turn the firewall off.

   :::

   ```bash
   acme.sh --issue --standalone -d your_node.example.com
   ```
   
   :::tip

   If you have the following error:
  
   ```bash
   acme.sh: command not found
   ```
   
   Run:

   ```bash
   source ~/.bashrc
   ```
   
   :::

   :::warning

   `your_node.example.com` is an example. **Replace it** with your node link.

   :::

6. Install the certificate by running the following command:

   ```bash
   acme.sh --install-cert -d your_node.example.com \
   --cert-file /opt/thepower/db/cert/your_node.example.com.crt \
   --key-file /opt/thepower/db/cert/your_node.example.com.key \
   --ca-file /opt/thepower/db/cert/your_node.example.com.crt.ca.crt
   ```

   :::warning
   
   `your_node.example.com` is an example. **Replace it** with your node link.
   
   :::

After you've installed the certificate, you can get the certificate status by running the following command:

```bash
acme.sh --info -d your_node.example.com
```

where

`your_node.example.com` — your node address link. Replace it with your node link.

7. Stop your node and restart it:

   1. **Docker:**

      1. ```bash
         docker stop tpnode
         ```

      2. ```bash
         docker rm tpnode
         ```

      3. ```bash
         docker rmi thepowerio/tpnode
         ```
      
      4. ```bash
         docker run -d \
         --name tpnode \
         --restart unless-stopped \
         --mount type=bind,source="$(pwd)"/db,target=/opt/thepower/db \
         --mount type=bind,source="$(pwd)"/log,target=/opt/thepower/log \
         --mount type=bind,source="$(pwd)"/node.config,target=/opt/thepower/node.config \
         --mount type=bind,source="$(pwd)"/genesis.txt,target=/opt/thepower/genesis.txt \
   
         <!--The commands below specify all necessary local ports. 
         In this example ports `api`, `apis`, and `tpic` are used. 
         Specify the port of your chain from `node.config` file.-->
   
         -p 1800:1800 \
         -p 1080:1080 \
         -p 1443:1443 \
         thepowerio/tpnode
         ```
         
   2. **Source:**

      1. ```bash
         systemctl stop tpnode.service
         ```
      2. Create a file `tpnode.service` under `/etc/systemd/system` directory. The file must contain the following:

         ```bash
         [Unit]
         Description=tpnode service
         Requires=network.target
         After=network.target

         [Service]
         Type=forking
         ExecStart=/opt/thepower/bin/thepower start
         ExecStop=/opt/thepower/bin/thepower stop
         User=root
         Group=root
         Restart=on-failure

         [Install]
         WantedBy=multi-user.target
         ```

      3. Run the following command to rerun all generators , reload all unit files and recreate the entire dependency tree. While the daemon is being reloaded, all sockets `systemd` listens to on behalf of user configuration will stay accessible:

         ```bash
         systemctl daemon-reload
         ```

      4. Run the following command to enable the service after reboot:

         ```bash
         systemctl enable tpnode.service
         ```

      5. Start the node using the following command:

         ```bash
         systemctl start tpnode.service
         ```