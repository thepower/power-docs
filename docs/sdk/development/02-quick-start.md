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

To start using the JavaScript implementation of The Power API install the `@thepowereco/tssdk` package:

```bash npm2yarn
npm i @thepowereco/tssdk
```

This package now contains the necessary libraries for The Power API.

You can import the necessary libraries directly from the package. For example, if you need the address library or the transaction library, you can import them as follows:

```javascript
import { AddressLib, TransactionsLib } from '@thepowereco/tssdk';
```

## What's next?

1. Visit our Hello World apps section to learn how to work with our 

   - [transactions](transactions/01-intro.md),
   - [smart contracts](smart-contracts/01-intro.md).

2. Go get information about The Power libraries to dive into the development [here](03-lib-description.md).

For more detailed information about the API and its usage, please refer to the [API reference documentation](https://doc.thepower.io/docs/Build/api/api-reference/).