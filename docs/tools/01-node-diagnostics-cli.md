# Node diagnostics utility

**Table of contents**
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Disclaimer](#disclaimer)
- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Starting the utility](#starting-the-utility)
- [Contribution](#contribution)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Disclaimer

The utility is delivered "as is". The Power DCloud is not responsible for any actions performed by the user.

## Introduction

During the Testnet campaign we analyzed the common issues occurring during starting up the node and created a special utility that is supposed to help users diagnose such issues themselves.

## Prerequisites

| OS     | Node installation folder | `node.config` status |
|--------|--------------------------|----------------------|
| Ubuntu | `/opt/thepower`          | Created              |

## Starting the utility

To start the utility, just run the following command under `root` user:

```bash
bash -c "$(curl -s https://help.thepower.io)"
```

## Contribution

Don't hesitate to offer new features to this utility. The ideas are accepted at our community chats or in code representation at [GutHub](https://github.com/thepower/nodeutils).