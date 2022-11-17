# How to obtain an SSL certificate for a node?

If you need an SSL certificate for your node, follow the steps below:

1. Ensure that you use `root` account. It is necessary for further steps.
2. Install `acme.sh` by running the following command. Please, specify your real e-mail address:

   ```bash
   apt-get install socat
   curl https://get.acme.sh | sh -s email=my@example.com
   ```
3. Log out of the system.
4. Log in again.
5. Obtain the certificate. To do this, run the following command:

   ```bash
   acme.sh --issue --standalone -d your_node.example.com
   ```
   
   ::: warning

   `your_node.example.com` is an example. **Replace it** with your node link.

   :::

6. Install the certificate by running the following command:

   ```bash
   acme.sh --install-cert -d your_node.example.com --cert-file \
   /opt/thepower/db/cert/your_node.example.com.crt --key-file \
   /opt/thepower/db/cert/your_node.example.com.key --ca-file \
   /opt/thepower/db/cert/your_node.example.com.crt.ca.crt
   ```

   ::: warning
   
   `your_node.example.com` is an example. **Replace it** with your node link.
   
   :::

You can add Telegram notifications to promptly get information about Acme script actions. To do this, run:

```bash
export TELEGRAM_BOT_CHATID=Your Telegram ID \
export TELEGRAM_BOT_APITOKEN=Chatbot token \
acme.sh --set-notify --notify-hook telegram
```

After you've installed the certificate, you can get the certificate status by running the following command:

```bash
acme.sh --info -d your_node.example.com
```

