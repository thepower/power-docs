# Power SDK Quick Start Guide

**Table of Contents**

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Introduction](#introduction)
- [Quick start](#quick-start)
- [What's next?](#whats-next)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Introduction

Here is a JavaScript implementation of The Power API.
The API description can be found [here](https://doc.thepower.io/docs/Build/api/common-terms).

## Quick start

To start using to start using the JavaScript implementation of The Power API:

1. Clone `tp_sdk_js` repository into desired working directory:

   ```bash
   git clone https://github.com/thepower/tp_sdk_js.git
   ```

2. Go to `tp_sdk_js` directory:

   ```bash
   cd tp_sdk_js
   ```

3. Register the `tp_msgpack` submodule:

   ```bash
   git submodule init
   ```

4. Update the submodule:

   ```bash
   git submodule update
   ```
5. Install the library:

   ```bash
   npm install
   ```
6. Build the library:

   ```bash
   npm run build
   ```

`tp_sdk_js/build` directory now contains `tp-sdk.min.js` file. This file can be included into your HTML page. Global object tpSdk will be available for you. It contains libraries for The Power API.

As another option, you may simply import `address-lib.js` (address library) or `transactions-lib.js` (transaction library) files directly.

:::caution Attention

When using transaction library, please make sure the `js-sha512/sha512.min.js` file is accessible via root-relative link `/sha512.min.js`.

:::

## What's next?

1. Visit our Hello World apps section to learn how to work with our 

   - [transactions](./transactions/01-intro.md),
   - [smart contracts](./smart-contracts/01-intro.md).

2. Go get information about The Power libraries to dive into the development [here](./02-lib-description.md).