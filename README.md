<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Power DCloud's documentation portal, built with Docusaurus](#power-dclouds-documentation-portal-built-with-docusaurus)
  - [Installation](#installation)
    - [Local Development](#local-development)
    - [Build](#build)
    - [Deployment](#deployment)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Power DCloud's documentation portal, built with Docusaurus

Explore the docs at [docs.thepower.io](https://docs.thepower.io).

The Power Blockchain Ecosystem is a new generation blockchain network that forms a new layer of the whole worldwide Internet with real WEB3 cloud with decentralized services.

## Installation

```bash
yarn
```

### Local Development

```bash
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```bash
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using SSH:

```bash
USE_SSH=true yarn deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
