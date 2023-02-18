# Preparing the project

First, you need to prepare your project. To do this, follow the steps:

1. Create `dcloud_example` directory.
2. Open the console (terminal) and make the path to `dcloud_example` folder as a home directory.
3. To initially prepare the `package.json` project configuration file, run the following command:

   ```bash
   npm init
   ```

   It will ask you some questions. Just click **Enter** and answer `yes` to the last question.

   After the command is executed, the `package.json` file appears in the empty `dcloud_example` directory.

   The successfully executed command will output the following:

   ```text
   This utility will walk you through creating a package.json file.
   It only covers the most common items, and tries to guess sensible defaults.
   See `npm help init` for definitive documentation on these fields and exactly what they do.

   Use `npm install <pkg>` afterwards to install a package and save it as a dependency in the package.json file.

   Press ^C at any time to quit.
   package name: (dcloud_example)
   version: (1.0.0)
   description:
   entry point: (index.js)
   test command:
   git repository:
   keywords:
   author:
   license: (ISC)
   About to write to D:\Temp\111\dcloud_example\package.json:

   {
   "name": "dcloud_example",
   "version": "1.0.0",
   "description": "",
   "main": "index.js",
   "scripts": {
   "test": "echo \"Error: no test specified\" && exit 1"
   },
   "author": "",
   "license": "ISC"
   }

   Is this OK? (yes) yes
   ```

4. Open the file and add the following line:

   ```json
   "type": "module"
   ```

   The file will then look as follows:

   ```json
   {
   "name": "dcloud_example",
   "version": "1.0.0",
   "description": "",
   "main": "index.js",
   "scripts": {
   "test": "echo \"Error: no test specified\" && exit 1"
   },
   "author": "",
   "license": "ISC",
   "type": "module"
   }
   ```

   :::info

   Don't forget to add a comma after `"license": "ISC"` when copying `"type": "module"`.

   :::

5. Add `tssdk` library to the project by running the following command:

   ```bash
   npm install @thepowereco/tssdk
   ```
