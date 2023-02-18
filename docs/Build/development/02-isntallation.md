# Power SDK installation

<!-- START doctoc -->
<!-- END doctoc -->

## Introduction

You have two options to install The Power SDK:

1. Using NPM.
2. From Code.

## Install The Power SDK using `npm`

To install The Power SDK using `npm`, run the following command:

```bash
npm install @thepowereco/tssdk
```

## Install The Power SDK from code

Follow the steps below to install The Power SDK from code:

1. Download the project using the **[link](https://github.com/thepower/PowerTools)**.
2. Find the `tssdk` directory under the following path:

   ```text
   PowerTools/packages/tssdk
   ```
   
3. Copy `tssdk` directory into your project directory.
4. Go to `tssdk` directory using the terminal:

   ```bash
   cd your_project_directory/tssdk
   ```
   
5. To install SDK, run:

   ```bash
   npm install
   ```

6. To build SDK, run:

   ```bash
   npm build
   ```
   
## Connect SDK to your project code

To connect SDK to your project code you need to specify the path to `tssdk/tssdk/dist/index.js`.

For example, for `your_project/index.js` file, you need to add the following into the file header:

```javascript
import {* } from './tssdk/dist/index.js';
```