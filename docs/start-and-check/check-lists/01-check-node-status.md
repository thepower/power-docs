# How can I check my node status?

To check address link for your node, open the terminal and run:

```bash
curl http://<DNS or IP>:<api port from node.config>/api/node/status
```

If you use SSL, use the following command:

```bash
curl https://<DNS or IP>:<apis port from node.config>/api/node/status
```


:::caution Warning

Replace

- `<DNS or IP>`, and
- `<apis port from node.config>`

with your data.

:::