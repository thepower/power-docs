<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [How can I check my node status?](#how-can-i-check-my-node-status)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

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